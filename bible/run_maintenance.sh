#!/bin/bash
# Move to the project directory
cd /Users/dayyoung/bible

# Log starting time
echo "--------------------------------------------------" >> batch_job.log
date >> batch_job.log
echo "Starting daily YouTube maintenance and playlist job..." >> batch_job.log

# 1. Update Video Titles (Fix formats)
echo "[1/2] Running Title Correction Script..." >> batch_job.log
python3 fix_youtube_titles.py >> batch_job.log 2>&1

# 2. One-time Playlist Cleanup (Only runs until all old playlists are gone)
if [ ! -f .playlists_deleted ]; then
    echo "[NEW] Running One-time Playlist Cleanup..." >> batch_job.log
    python3 delete_all_playlists.py >> batch_job.log 2>&1
    # We don't exit here; if it partly succeeds or hits quota, it tries again next time.
    # If it finishes completely, delete_all_playlists.py will create the .playlists_deleted file.
fi

# 3. Manage Book-Level Playlists (66 Books)
echo "[3/4] Running Book-Level Playlist Management..." >> batch_job.log
python3 manage_playlists.py >> batch_job.log 2>&1

# 4. Manage Chapter-Level Playlists (1,189 Chapters)
echo "[4/4] Running Chapter-Level Playlist Management..." >> batch_job.log
python3 create_chapter_playlists.py >> batch_job.log 2>&1

echo "Batch job completed." >> batch_job.log
date >> batch_job.log
echo "--------------------------------------------------" >> batch_job.log
