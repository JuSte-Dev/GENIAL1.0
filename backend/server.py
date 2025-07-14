from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, File, UploadFile, Form
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt
import qrcode
import io
import base64
import os
import logging
import uuid
from pathlib import Path
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Environment setup
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Security setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()
JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'your-secret-key')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# FastAPI app
app = FastAPI(title="GENIAL API", version="1.0.0")
api_router = APIRouter(prefix="/api")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ===== MODELS =====

class UserRole(str):
    CLIENT = "client"
    PRODUCER = "producer"
    VENDOR = "vendor"
    ADMIN = "admin"

class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    name: str
    phone: Optional[str] = None
    role: str = UserRole.CLIENT
    password_hash: str
    loyalty_points: int = 0
    qr_code: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class UserCreate(BaseModel):
    email: EmailStr
    name: str
    phone: Optional[str] = None
    password: str
    role: str = UserRole.CLIENT

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: Dict[str, Any]

class Producer(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    company_name: str
    description: str
    location: str
    specialties: List[str]
    certification: Optional[str] = None
    image_url: Optional[str] = None
    contact_email: EmailStr
    contact_phone: str
    is_verified: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ProducerCreate(BaseModel):
    company_name: str
    description: str
    location: str
    specialties: List[str]
    certification: Optional[str] = None
    image_url: Optional[str] = None
    contact_email: EmailStr
    contact_phone: str

class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    category: str
    price: float
    unit: str
    stock: int = 0
    image_url: Optional[str] = None
    producer_id: str
    origin: str
    producer_name: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ProductCreate(BaseModel):
    name: str
    description: str
    category: str
    price: float
    unit: str
    stock: int = 0
    image_url: Optional[str] = None
    origin: str
    producer_name: Optional[str] = None

class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    items: List[Dict[str, Any]]
    total_amount: float
    status: str = "pending"
    order_number: str
    preparation_time: int
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class OrderCreate(BaseModel):
    items: List[Dict[str, Any]]
    total_amount: float

class Reservation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    type: str  # "table" or "experience"
    date: datetime
    time_slot: str
    guests: int
    special_requests: Optional[str] = None
    status: str = "pending"
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ReservationCreate(BaseModel):
    type: str
    date: datetime
    time_slot: str
    guests: int
    special_requests: Optional[str] = None

class JobPosting(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    requirements: List[str]
    location: str
    salary: Optional[str] = None
    job_type: str  # "full-time", "part-time", "contract"
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class JobPostingCreate(BaseModel):
    title: str
    description: str
    requirements: List[str]
    location: str
    salary: Optional[str] = None
    job_type: str

class JobApplication(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    job_id: str
    applicant_name: str
    applicant_email: EmailStr
    applicant_phone: str
    cover_letter: str
    resume_url: Optional[str] = None
    status: str = "pending"
    created_at: datetime = Field(default_factory=datetime.utcnow)

class JobApplicationCreate(BaseModel):
    job_id: str
    applicant_name: str
    applicant_email: EmailStr
    applicant_phone: str
    cover_letter: str
    resume_url: Optional[str] = None

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    type: str = "general"  # "general", "producer", "partnership"
    status: str = "new"
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str
    type: str = "general"

class LoyaltyTransaction(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    points: int
    transaction_type: str  # "earned", "redeemed"
    description: str
    order_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

# ===== UTILITY FUNCTIONS =====

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def generate_qr_code(user_id: str) -> str:
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(f"genial://user/{user_id}")
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    img_buffer = io.BytesIO()
    img.save(img_buffer, format='PNG')
    img_str = base64.b64encode(img_buffer.getvalue()).decode()
    return f"data:image/png;base64,{img_str}"

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = await db.users.find_one({"id": user_id})
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        return User(**user)
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_current_producer(current_user: User = Depends(get_current_user)):
    if current_user.role not in [UserRole.PRODUCER, UserRole.ADMIN]:
        raise HTTPException(status_code=403, detail="Not authorized")
    return current_user

async def get_current_vendor(current_user: User = Depends(get_current_user)):
    if current_user.role not in [UserRole.VENDOR, UserRole.ADMIN]:
        raise HTTPException(status_code=403, detail="Not authorized")
    return current_user

async def get_current_admin(current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user

# ===== AUTHENTICATION ROUTES =====

@api_router.post("/auth/register", response_model=Token)
async def register(user_data: UserCreate):
    # Check if user exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    password_hash = hash_password(user_data.password)
    user = User(
        email=user_data.email,
        name=user_data.name,
        phone=user_data.phone,
        role=user_data.role,
        password_hash=password_hash,
        qr_code=generate_qr_code(str(uuid.uuid4()))
    )
    
    await db.users.insert_one(user.dict())
    
    # Create token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.id}, expires_delta=access_token_expires
    )
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        user=user.dict()
    )

@api_router.post("/auth/login", response_model=Token)
async def login(user_data: UserLogin):
    user = await db.users.find_one({"email": user_data.email})
    if not user or not verify_password(user_data.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["id"]}, expires_delta=access_token_expires
    )
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        user=user
    )

@api_router.get("/auth/me", response_model=User)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return current_user

# ===== PRODUCT ROUTES =====

@api_router.get("/products", response_model=List[Product])
async def get_products(category: Optional[str] = None, search: Optional[str] = None):
    query = {"is_active": True}
    if category and category != "all":
        query["category"] = category
    if search:
        query["$text"] = {"$search": search}
    
    products = await db.products.find(query).to_list(100)
    return [Product(**product) for product in products]

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"id": product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product(**product)

@api_router.post("/products", response_model=Product)
async def create_product(product_data: ProductCreate, current_user: User = Depends(get_current_producer)):
    product = Product(
        **product_data.dict(),
        producer_id=current_user.id
    )
    await db.products.insert_one(product.dict())
    return product

@api_router.put("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, product_data: ProductCreate, current_user: User = Depends(get_current_producer)):
    product = await db.products.find_one({"id": product_id, "producer_id": current_user.id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    updated_product = Product(**product)
    for key, value in product_data.dict(exclude_unset=True).items():
        setattr(updated_product, key, value)
    updated_product.updated_at = datetime.utcnow()
    
    await db.products.replace_one({"id": product_id}, updated_product.dict())
    return updated_product

@api_router.delete("/products/{product_id}")
async def delete_product(product_id: str, current_user: User = Depends(get_current_producer)):
    result = await db.products.delete_one({"id": product_id, "producer_id": current_user.id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}

# ===== ORDER ROUTES =====

@api_router.post("/orders", response_model=Order)
async def create_order(order_data: OrderCreate, current_user: User = Depends(get_current_user)):
    order_number = f"CMD{str(uuid.uuid4())[:8].upper()}"
    preparation_time = 15 + len(order_data.items) * 2
    
    order = Order(
        user_id=current_user.id,
        items=order_data.items,
        total_amount=order_data.total_amount,
        order_number=order_number,
        preparation_time=preparation_time
    )
    
    await db.orders.insert_one(order.dict())
    
    # Add loyalty points (1 point per euro spent)
    loyalty_points = int(order_data.total_amount)
    await db.users.update_one(
        {"id": current_user.id},
        {"$inc": {"loyalty_points": loyalty_points}}
    )
    
    # Record loyalty transaction
    loyalty_transaction = LoyaltyTransaction(
        user_id=current_user.id,
        points=loyalty_points,
        transaction_type="earned",
        description=f"Points earned from order {order_number}",
        order_id=order.id
    )
    await db.loyalty_transactions.insert_one(loyalty_transaction.dict())
    
    return order

@api_router.get("/orders", response_model=List[Order])
async def get_user_orders(current_user: User = Depends(get_current_user)):
    orders = await db.orders.find({"user_id": current_user.id}).sort("created_at", -1).to_list(50)
    return [Order(**order) for order in orders]

@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str, current_user: User = Depends(get_current_user)):
    order = await db.orders.find_one({"id": order_id, "user_id": current_user.id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return Order(**order)

# ===== RESERVATION ROUTES =====

@api_router.post("/reservations", response_model=Reservation)
async def create_reservation(reservation_data: ReservationCreate, current_user: User = Depends(get_current_user)):
    reservation = Reservation(
        user_id=current_user.id,
        **reservation_data.dict()
    )
    await db.reservations.insert_one(reservation.dict())
    return reservation

@api_router.get("/reservations", response_model=List[Reservation])
async def get_user_reservations(current_user: User = Depends(get_current_user)):
    reservations = await db.reservations.find({"user_id": current_user.id}).sort("date", -1).to_list(50)
    return [Reservation(**reservation) for reservation in reservations]

# ===== PRODUCER ROUTES =====

@api_router.post("/producers", response_model=Producer)
async def create_producer_profile(producer_data: ProducerCreate, current_user: User = Depends(get_current_producer)):
    producer = Producer(
        user_id=current_user.id,
        **producer_data.dict()
    )
    await db.producers.insert_one(producer.dict())
    return producer

@api_router.get("/producers", response_model=List[Producer])
async def get_producers():
    producers = await db.producers.find({"is_verified": True}).to_list(100)
    return [Producer(**producer) for producer in producers]

@api_router.get("/producers/{producer_id}", response_model=Producer)
async def get_producer(producer_id: str):
    producer = await db.producers.find_one({"id": producer_id})
    if not producer:
        raise HTTPException(status_code=404, detail="Producer not found")
    return Producer(**producer)

@api_router.get("/producers/{producer_id}/products", response_model=List[Product])
async def get_producer_products(producer_id: str):
    products = await db.products.find({"producer_id": producer_id, "is_active": True}).to_list(100)
    return [Product(**product) for product in products]

# ===== JOB ROUTES =====

@api_router.post("/jobs", response_model=JobPosting)
async def create_job(job_data: JobPostingCreate, current_user: User = Depends(get_current_admin)):
    job = JobPosting(**job_data.dict())
    await db.jobs.insert_one(job.dict())
    return job

@api_router.get("/jobs", response_model=List[JobPosting])
async def get_jobs():
    jobs = await db.jobs.find({"is_active": True}).to_list(100)
    return [JobPosting(**job) for job in jobs]

@api_router.post("/jobs/{job_id}/apply", response_model=JobApplication)
async def apply_for_job(job_id: str, application_data: JobApplicationCreate):
    application = JobApplication(**application_data.dict())
    await db.job_applications.insert_one(application.dict())
    return application

# ===== CONTACT ROUTES =====

@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(message_data: ContactMessageCreate):
    message = ContactMessage(**message_data.dict())
    await db.contact_messages.insert_one(message.dict())
    return message

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages(current_user: User = Depends(get_current_admin)):
    messages = await db.contact_messages.find({}).sort("created_at", -1).to_list(100)
    return [ContactMessage(**message) for message in messages]

# ===== LOYALTY ROUTES =====

@api_router.get("/loyalty/transactions", response_model=List[LoyaltyTransaction])
async def get_loyalty_transactions(current_user: User = Depends(get_current_user)):
    transactions = await db.loyalty_transactions.find({"user_id": current_user.id}).sort("created_at", -1).to_list(100)
    return [LoyaltyTransaction(**transaction) for transaction in transactions]

@api_router.post("/loyalty/redeem")
async def redeem_loyalty_points(points: int, current_user: User = Depends(get_current_user)):
    if current_user.loyalty_points < points:
        raise HTTPException(status_code=400, detail="Insufficient points")
    
    await db.users.update_one(
        {"id": current_user.id},
        {"$inc": {"loyalty_points": -points}}
    )
    
    transaction = LoyaltyTransaction(
        user_id=current_user.id,
        points=-points,
        transaction_type="redeemed",
        description=f"Redeemed {points} points"
    )
    await db.loyalty_transactions.insert_one(transaction.dict())
    
    return {"message": f"Successfully redeemed {points} points"}

# ===== VENDOR ROUTES =====

@api_router.get("/vendor/scan/{user_id}")
async def scan_user_qr(user_id: str, current_user: User = Depends(get_current_vendor)):
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Get recent orders
    orders = await db.orders.find({"user_id": user_id}).sort("created_at", -1).limit(5).to_list(5)
    
    # Get loyalty transactions
    transactions = await db.loyalty_transactions.find({"user_id": user_id}).sort("created_at", -1).limit(10).to_list(10)
    
    return {
        "user": User(**user),
        "recent_orders": [Order(**order) for order in orders],
        "loyalty_transactions": [LoyaltyTransaction(**transaction) for transaction in transactions]
    }

# ===== DASHBOARD ROUTES =====

@api_router.get("/dashboard/producer")
async def get_producer_dashboard(current_user: User = Depends(get_current_producer)):
    # Get producer's products
    products = await db.products.find({"producer_id": current_user.id}).to_list(100)
    
    # Get sales data
    orders = await db.orders.find({
        "items.producer_id": current_user.id,
        "status": "completed"
    }).to_list(1000)
    
    total_sales = sum(order.get("total_amount", 0) for order in orders)
    total_orders = len(orders)
    
    return {
        "total_products": len(products),
        "total_sales": total_sales,
        "total_orders": total_orders,
        "products": [Product(**product) for product in products],
        "recent_orders": [Order(**order) for order in orders[-10:]]
    }

# ===== HEALTH CHECK =====

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

# Include router
app.include_router(api_router)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()