import argparse
import sys
import os

# Add current directory to path to allow imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from experto import consultar
except ImportError:
    # Fallback if run from root
    from python_core.experto import consultar

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--query", type=str, required=True)
    parser.add_argument("--modality", type=str, default=None)
    parser.add_argument("--level", type=str, default=None)
    parser.add_argument("--profile", type=str, default="ESTANDAR")
    
    args = parser.parse_args()
    
    # We ignore modality/level for now as the prompt engineering handles it
    # or we could inject it into the query string
    
    try:
        # demo_mode could be passed via args if needed
        result = consultar(args.query, demo_mode=False, profile=args.profile)
        print(result) # STDOUT for Node.js
    except Exception as e:
        print(f"BRIDGE_ERROR: {e}")

if __name__ == "__main__":
    main()
