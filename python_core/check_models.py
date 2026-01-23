import os
import sys
from dotenv import load_dotenv
from google import genai

sys.stdout.reconfigure(encoding='utf-8')
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))

def list_all():
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if not api_key:
        print("❌ No Key")
        return

    client = genai.Client(api_key=api_key)
    print("📡 Listing available models...")
    try:
        # Pager through list
        for m in client.models.list():
            try:
                 # Check if it supports generation
                 if "generateContent" in m.supported_generation_methods:
                     print(f"✅ FOUND: {m.name}")
            except:
                 pass
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    list_all()
