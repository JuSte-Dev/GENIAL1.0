#!/usr/bin/env python3
"""
Backend API Testing for GenialMarket
Tests all public API endpoints using the production URL
"""

import requests
import sys
import json
from datetime import datetime, timedelta
from typing import Dict, Any, Optional

class GenialMarketAPITester:
    def __init__(self, base_url="https://a0601c58-757a-4075-9855-a9876e4ab83a.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.token = None
        self.user_id = None
        self.tests_run = 0
        self.tests_passed = 0
        self.session = requests.Session()
        self.session.headers.update({'Content-Type': 'application/json'})

    def log_test(self, name: str, success: bool, details: str = ""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED {details}")
        else:
            print(f"❌ {name} - FAILED {details}")

    def run_test(self, name: str, method: str, endpoint: str, expected_status: int, 
                 data: Optional[Dict] = None, headers: Optional[Dict] = None) -> tuple[bool, Dict]:
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        test_headers = self.session.headers.copy()
        if headers:
            test_headers.update(headers)
        if self.token:
            test_headers['Authorization'] = f'Bearer {self.token}'

        try:
            if method == 'GET':
                response = self.session.get(url, headers=test_headers)
            elif method == 'POST':
                response = self.session.post(url, json=data, headers=test_headers)
            elif method == 'PUT':
                response = self.session.put(url, json=data, headers=test_headers)
            elif method == 'DELETE':
                response = self.session.delete(url, headers=test_headers)

            success = response.status_code == expected_status
            response_data = {}
            
            try:
                response_data = response.json()
            except:
                response_data = {"text": response.text}

            details = f"(Status: {response.status_code})"
            if not success:
                details += f" - Expected {expected_status}, Response: {response.text[:200]}"
            
            self.log_test(name, success, details)
            return success, response_data

        except Exception as e:
            self.log_test(name, False, f"Exception: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test health endpoint"""
        success, data = self.run_test("Health Check", "GET", "health", 200)
        return success

    def test_get_products(self):
        """Test products endpoint"""
        success, data = self.run_test("Get Products", "GET", "products", 200)
        if success:
            products_count = len(data) if isinstance(data, list) else 0
            print(f"   📊 Found {products_count} products")
            if products_count == 63:
                print("   ✅ Expected 63 products found!")
            else:
                print(f"   ⚠️  Expected 63 products, found {products_count}")
        return success, data

    def test_get_products_with_filters(self):
        """Test products with category filter"""
        success, data = self.run_test("Get Products - Fruits & Légumes", "GET", "products?category=Fruits & Légumes", 200)
        if success and isinstance(data, list):
            print(f"   📊 Found {len(data)} products in Fruits & Légumes category")
        
        success2, data2 = self.run_test("Get Products - Search", "GET", "products?search=tomate", 200)
        if success2 and isinstance(data2, list):
            print(f"   📊 Found {len(data2)} products matching 'tomate'")
        
        return success and success2

    def test_get_producers(self):
        """Test producers endpoint"""
        success, data = self.run_test("Get Producers", "GET", "producers", 200)
        if success and isinstance(data, list):
            print(f"   📊 Found {len(data)} producers")
        return success

    def test_get_jobs(self):
        """Test jobs endpoint"""
        success, data = self.run_test("Get Jobs", "GET", "jobs", 200)
        if success and isinstance(data, list):
            print(f"   📊 Found {len(data)} job postings")
        return success

    def test_contact_message(self):
        """Test contact message creation"""
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Test Message",
            "message": "This is a test message from API testing",
            "type": "general"
        }
        success, data = self.run_test("Create Contact Message", "POST", "contact", 200, contact_data)
        return success

    def test_user_registration(self):
        """Test user registration"""
        timestamp = datetime.now().strftime("%H%M%S")
        user_data = {
            "email": f"testuser{timestamp}@example.com",
            "name": f"Test User {timestamp}",
            "phone": "+33123456789",
            "password": "TestPassword123!",
            "role": "client"
        }
        
        success, data = self.run_test("User Registration", "POST", "auth/register", 200, user_data)
        if success and 'access_token' in data:
            self.token = data['access_token']
            if 'user' in data:
                self.user_id = data['user'].get('id')
            print(f"   🔑 Token obtained for user: {user_data['email']}")
        return success

    def test_user_login(self):
        """Test user login with existing credentials"""
        if not self.token:
            print("   ⚠️  Skipping login test - no registered user")
            return True
            
        # We'll use the registered user's credentials
        # For now, just test that we have a token from registration
        success, data = self.run_test("Get Current User", "GET", "auth/me", 200)
        return success

    def test_authenticated_endpoints(self):
        """Test endpoints that require authentication"""
        if not self.token:
            print("   ⚠️  Skipping authenticated tests - no token")
            return True

        # Test getting user orders
        success1, _ = self.run_test("Get User Orders", "GET", "orders", 200)
        
        # Test getting user reservations  
        success2, _ = self.run_test("Get User Reservations", "GET", "reservations", 200)
        
        # Test loyalty transactions
        success3, _ = self.run_test("Get Loyalty Transactions", "GET", "loyalty/transactions", 200)
        
        return success1 and success2 and success3

    def test_create_order(self):
        """Test order creation"""
        if not self.token:
            print("   ⚠️  Skipping order test - no token")
            return True

        order_data = {
            "items": [
                {
                    "product_id": "test-product-1",
                    "name": "Test Product",
                    "price": 5.99,
                    "quantity": 2
                }
            ],
            "total_amount": 11.98
        }
        
        success, data = self.run_test("Create Order", "POST", "orders", 200, order_data)
        return success

    def test_create_reservation(self):
        """Test reservation creation"""
        if not self.token:
            print("   ⚠️  Skipping reservation test - no token")
            return True

        reservation_data = {
            "type": "table",
            "date": (datetime.now() + timedelta(days=7)).isoformat(),
            "time_slot": "19:00",
            "guests": 4,
            "special_requests": "Table près de la fenêtre"
        }
        
        success, data = self.run_test("Create Reservation", "POST", "reservations", 200, reservation_data)
        return success

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting GenialMarket API Tests")
        print(f"🌐 Testing against: {self.api_url}")
        print("=" * 60)

        # Basic endpoint tests (no auth required)
        print("\n📋 Testing Public Endpoints:")
        self.test_health_check()
        products_success, products_data = self.test_get_products()
        self.test_get_products_with_filters()
        self.test_get_producers()
        self.test_get_jobs()
        self.test_contact_message()

        # Authentication tests
        print("\n🔐 Testing Authentication:")
        self.test_user_registration()
        self.test_user_login()

        # Authenticated endpoint tests
        print("\n🔒 Testing Authenticated Endpoints:")
        self.test_authenticated_endpoints()
        self.test_create_order()
        self.test_create_reservation()

        # Summary
        print("\n" + "=" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} tests failed")
            return 1

def main():
    tester = GenialMarketAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())