import time
import datetime
import subprocess
import os

def run_upload_job():
    print(f"[{datetime.datetime.now()}] Starting daily upload job...")
    # Run the upload_youtube.py script
    # Ensure stdout/stderr are visible or logged if you want (default goes to console)
    try:
        subprocess.run(["python3", "upload_youtube.py"], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Upload process exited with error code {e.returncode}. This might be due to quota limits, which is expected.")
    except Exception as e:
        print(f"An unexpected error occurred while running the upload script: {e}")
        
    print(f"[{datetime.datetime.now()}] job finished.")

def get_seconds_until_target(target_hour, target_minute):
    now = datetime.datetime.now()
    target = now.replace(hour=target_hour, minute=target_minute, second=0, microsecond=0)
    
    if target <= now:
        # If today's target time has passed, schedule for tomorrow
        target += datetime.timedelta(days=1)
        
    return (target - now).total_seconds()

def main():
    # Schedule for 17:01 (5:01 PM)
    target_hour = 17
    target_minute = 1
    
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir) # Ensure we are in the correct directory
    
    print(f"Scheduler started. Will run 'upload_youtube.py' daily at {target_hour:02d}:{target_minute:02d}.")
    
    while True:
        seconds_to_wait = get_seconds_until_target(target_hour, target_minute)
        next_run_time = datetime.datetime.now() + datetime.timedelta(seconds=seconds_to_wait)
        print(f"Waiting {seconds_to_wait/3600:.2f} hours until {next_run_time}...")
        
        try:
            time.sleep(seconds_to_wait)
            run_upload_job()
            # Sleep a buffer minute to ensure we don't trigger again immediately (though math prevents it)
            time.sleep(60)
        except KeyboardInterrupt:
            print("\nScheduler stopped by user.")
            break
        except Exception as e:
            print(f"Scheduler encountered an error: {e}")
            time.sleep(60) # Wait a bit before retrying loop logic

if __name__ == "__main__":
    main()
