
import os
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

TOKEN_PATH = '/Users/dayyoung/bible/token.json'
CLIENT_SECRET_PATH = '/Users/dayyoung/bible/client_secret.json'

def check_auth():
    creds = None
    if os.path.exists(TOKEN_PATH):
        creds = Credentials.from_authorized_user_file(TOKEN_PATH)
    
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            try:
                print("Refreshing token...")
                creds.refresh(Request())
                with open(TOKEN_PATH, 'w') as token:
                    token.write(creds.to_json())
                print("Token refreshed successfully.")
            except Exception as e:
                print(f"Error refreshing token: {e}")
        else:
            print("Token is invalid and cannot be refreshed. Manual re-auth required.")

if __name__ == "__main__":
    check_auth()
