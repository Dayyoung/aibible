from moviepy import ImageClip, concatenate_videoclips
import os

images = [
    "/Users/dayyoung/.gemini/antigravity/brain/b4302248-7395-4851-b6a6-92aa2bfe8f39/genesis_7_1_1769145361798.png",
    "/Users/dayyoung/.gemini/antigravity/brain/b4302248-7395-4851-b6a6-92aa2bfe8f39/genesis_7_2_1769145378375.png",
    "/Users/dayyoung/.gemini/antigravity/brain/b4302248-7395-4851-b6a6-92aa2bfe8f39/genesis_7_3_1769145395293.png",
    "/Users/dayyoung/.gemini/antigravity/brain/b4302248-7395-4851-b6a6-92aa2bfe8f39/genesis_7_4_1769145413657.png",
    "/Users/dayyoung/.gemini/antigravity/brain/b4302248-7395-4851-b6a6-92aa2bfe8f39/genesis_7_5_1769145429631.png"
]

clips = [ImageClip(img).with_duration(5) for img in images]
final_clip = concatenate_videoclips(clips, method="compose")
final_clip.write_videofile("genesis_7_part1.mp4", fps=24)
