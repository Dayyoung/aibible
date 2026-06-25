
import os
import json
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

TOKEN_PATH = '/Users/dayyoung/bible/secret/token.json'
REQUESTED_SCOPES = [
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube"
]

def attempt_broaden_scopes():
    if not os.path.exists(TOKEN_PATH):
        print(f"{TOKEN_PATH} not found.")
        return

    with open(TOKEN_PATH, 'r') as f:
        data = json.load(f)
        print(f"Current scopes: {data.get('scopes')}")

    try:
        # We load with EXPLICIT scopes to see if the refresh token can grant them
        creds = Credentials.from_authorized_user_file(TOKEN_PATH, REQUESTED_SCOPES)
        print("Attempting to refresh with broader scopes...")
        creds.refresh(Request())
        
        # If success, save it
        with open(TOKEN_PATH, 'w') as token:
            token.write(creds.to_json())
        print("Success! Token refreshed with requested scopes.")
        print(f"New scopes: {creds.scopes}")
    except Exception as e:
        print(f"Failed to broaden scopes via refresh: {e}")
        print("This usually means the original authorization did not include these scopes.")
        print("Manual re-authorization is likely required.")

if __name__ == "__main__":
    attempt_broaden_scopes()
