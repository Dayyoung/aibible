
import os
import json
from google_auth_oauthlib.flow import InstalledAppFlow

CLIENT_SECRETS_FILE = '/Users/dayyoung/bible/secret/client_secret.json'
TOKEN_FILE = '/Users/dayyoung/bible/secret/token.json'
SCOPES = [
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube",
    "https://www.googleapis.com/auth/youtube.force-ssl",
    "https://www.googleapis.com/auth/youtube.readonly"
]

def run_flow():
    flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRETS_FILE, SCOPES)
    # run_local_server will try to open a browser.
    # On many servers it fails and prints a URL.
    # We want to capture that URL.
    print("STARTING_FLOW")
    creds = flow.run_local_server(port=0, open_browser=False)
    
    with open(TOKEN_FILE, 'w') as token:
        token.write(creds.to_json())
    print("TOKEN_SAVED")

if __name__ == "__main__":
    run_flow()
