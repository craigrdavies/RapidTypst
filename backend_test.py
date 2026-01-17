#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime
import time

class TypstEditorAPITester:
    def __init__(self, base_url="http://localhost:8001"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name}")
        else:
            print(f"❌ {name} - {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        })

    def test_api_health(self):
        """Test basic API health"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Message: {data.get('message', 'No message')}"
            self.log_test("API Health Check", success, details)
            return success
        except Exception as e:
            self.log_test("API Health Check", False, str(e))
            return False

    def test_create_document(self):
        """Test document creation"""
        try:
            test_doc = {
                "title": f"Test Document {datetime.now().strftime('%H%M%S')}",
                "content": "= Test Document\n\nThis is a test document with *bold* text."
            }
            
            response = requests.post(f"{self.api_url}/documents", json=test_doc, timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                self.created_doc_id = data.get('id')
                details = f"Created document ID: {self.created_doc_id}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text[:200]}"
            
            self.log_test("Create Document", success, details)
            return success, self.created_doc_id if success else None
            
        except Exception as e:
            self.log_test("Create Document", False, str(e))
            return False, None

    def test_list_documents(self):
        """Test listing documents"""
        try:
            response = requests.get(f"{self.api_url}/documents", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                details = f"Found {len(data)} documents"
            else:
                details = f"Status: {response.status_code}"
            
            self.log_test("List Documents", success, details)
            return success
            
        except Exception as e:
            self.log_test("List Documents", False, str(e))
            return False

    def test_get_document(self, doc_id):
        """Test getting a specific document"""
        if not doc_id:
            self.log_test("Get Document", False, "No document ID provided")
            return False
            
        try:
            response = requests.get(f"{self.api_url}/documents/{doc_id}", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                details = f"Retrieved document: {data.get('title', 'No title')}"
            else:
                details = f"Status: {response.status_code}"
            
            self.log_test("Get Document", success, details)
            return success
            
        except Exception as e:
            self.log_test("Get Document", False, str(e))
            return False

    def test_update_document(self, doc_id):
        """Test updating a document"""
        if not doc_id:
            self.log_test("Update Document", False, "No document ID provided")
            return False
            
        try:
            update_data = {
                "content": "= Updated Test Document\n\nThis content has been updated with _italic_ text."
            }
            
            response = requests.put(f"{self.api_url}/documents/{doc_id}", json=update_data, timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                details = f"Updated document: {data.get('title', 'No title')}"
            else:
                details = f"Status: {response.status_code}"
            
            self.log_test("Update Document", success, details)
            return success
            
        except Exception as e:
            self.log_test("Update Document", False, str(e))
            return False

    def test_compile_typst(self):
        """Test Typst compilation for preview"""
        try:
            test_content = {
                "content": "= Hello Typst\n\nThis is a *test* document with _italic_ text.\n\n== Section\n\n- Item 1\n- Item 2"
            }
            
            response = requests.post(f"{self.api_url}/compile", json=test_content, timeout=15)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                has_html = bool(data.get('html'))
                details = f"Compilation success: {data.get('success')}, Has HTML: {has_html}"
            else:
                details = f"Status: {response.status_code}"
            
            self.log_test("Compile Typst", success, details)
            return success
            
        except Exception as e:
            self.log_test("Compile Typst", False, str(e))
            return False

    def test_export_pdf(self):
        """Test PDF export"""
        try:
            test_content = {
                "content": "= PDF Export Test\n\nThis document will be exported as PDF.",
                "format": "pdf"
            }
            
            response = requests.post(f"{self.api_url}/export/pdf", json=test_content, timeout=20)
            success = response.status_code == 200
            
            if success:
                content_type = response.headers.get('content-type', '')
                is_pdf = 'pdf' in content_type.lower()
                details = f"Content-Type: {content_type}, Is PDF: {is_pdf}"
            else:
                details = f"Status: {response.status_code}"
            
            self.log_test("Export PDF", success, details)
            return success
            
        except Exception as e:
            self.log_test("Export PDF", False, str(e))
            return False

    def test_export_html(self):
        """Test HTML export"""
        try:
            test_content = {
                "content": "= HTML Export Test\n\nThis document will be exported as HTML.",
                "format": "html"
            }
            
            response = requests.post(f"{self.api_url}/export/html", json=test_content, timeout=15)
            success = response.status_code == 200
            
            if success:
                content_type = response.headers.get('content-type', '')
                is_html = 'html' in content_type.lower()
                details = f"Content-Type: {content_type}, Is HTML: {is_html}"
            else:
                details = f"Status: {response.status_code}"
            
            self.log_test("Export HTML", success, details)
            return success
            
        except Exception as e:
            self.log_test("Export HTML", False, str(e))
            return False

    def test_export_docx(self):
        """Test DOCX export"""
        try:
            test_content = {
                "content": "= DOCX Export Test\n\nThis document will be exported as DOCX.",
                "format": "docx"
            }
            
            response = requests.post(f"{self.api_url}/export/docx", json=test_content, timeout=15)
            success = response.status_code == 200
            
            if success:
                content_type = response.headers.get('content-type', '')
                is_docx = 'wordprocessingml' in content_type.lower() or 'docx' in content_type.lower()
                details = f"Content-Type: {content_type}, Is DOCX: {is_docx}"
            else:
                details = f"Status: {response.status_code}"
            
            self.log_test("Export DOCX", success, details)
            return success
            
        except Exception as e:
            self.log_test("Export DOCX", False, str(e))
            return False

    def test_delete_document(self, doc_id):
        """Test document deletion"""
        if not doc_id:
            self.log_test("Delete Document", False, "No document ID provided")
            return False
            
        try:
            response = requests.delete(f"{self.api_url}/documents/{doc_id}", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                details = f"Message: {data.get('message', 'Deleted')}"
            else:
                details = f"Status: {response.status_code}"
            
            self.log_test("Delete Document", success, details)
            return success
            
        except Exception as e:
            self.log_test("Delete Document", False, str(e))
            return False

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Typst Editor API Tests...")
        print(f"Testing API at: {self.api_url}")
        print("-" * 50)
        
        # Test API health first
        if not self.test_api_health():
            print("❌ API is not accessible. Stopping tests.")
            return False
        
        # Test document CRUD operations
        success, doc_id = self.test_create_document()
        if success:
            self.test_get_document(doc_id)
            self.test_update_document(doc_id)
        
        self.test_list_documents()
        
        # Test compilation and export
        self.test_compile_typst()
        self.test_export_pdf()
        self.test_export_html()
        self.test_export_docx()
        
        # Clean up - delete test document
        if success and doc_id:
            self.test_delete_document(doc_id)
        
        # Print summary
        print("-" * 50)
        print(f"📊 Tests completed: {self.tests_passed}/{self.tests_run} passed")
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"📈 Success rate: {success_rate:.1f}%")
        
        return self.tests_passed == self.tests_run

def main():
    tester = TypstEditorAPITester()
    success = tester.run_all_tests()
    
    # Save detailed results
    results = {
        "timestamp": datetime.now().isoformat(),
        "total_tests": tester.tests_run,
        "passed_tests": tester.tests_passed,
        "success_rate": (tester.tests_passed / tester.tests_run * 100) if tester.tests_run > 0 else 0,
        "test_details": tester.test_results
    }
    
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())