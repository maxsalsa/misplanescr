import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))

def test_langchain():
    key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    os.environ["GOOGLE_API_KEY"] = key
    
    try:
        llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash")
        print("🤖 Testing LangChain wrapper...")
        res = llm.invoke("Hello")
        print(f"✅ LangChain Success: {res.content}")
    except Exception as e:
        print(f"❌ LangChain Failed: {e}")

if __name__ == "__main__":
    test_langchain()
