import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))

def test_legacy():
    key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    genai.configure(api_key=key)
    
    try:
        model = genai.GenerativeModel('gemini-pro')
        print("🤖 Testing Legacy gemini-pro...")
        res = model.generate_content("Hello")
        print(f"✅ Legacy Success: {res.text}")
    except Exception as e:
        print(f"❌ Legacy Failed: {e}")

if __name__ == "__main__":
    test_legacy()
