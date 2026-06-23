# Hero Video Optimisation Guide

The code now fades the video in only after `canplay` fires, so there's no flash.
The real bottleneck is the video file itself. Follow these steps.

---

## Target specs

| Setting        | Value                        |
|----------------|------------------------------|
| Resolution     | 1280×720 (720p) — NOT 1080p  |
| Duration       | 10–15 s loop                 |
| Frame rate     | 24 fps                       |
| Video codec    | H.264 (mp4) + VP9 (webm)     |
| Audio          | Strip it entirely            |
| Target size    | < 5 MB for mp4               |

720p is plenty — the video is always blurred by the dark overlay.
Going 1080p doubles the file size for zero visible benefit.

---

## FFmpeg commands (free, one-time install)

### Step 1 — trim to a clean 12-second loop
```
ffmpeg -i input.mp4 -ss 00:00:02 -t 12 -an trimmed.mp4
```

### Step 2 — encode optimised MP4
```
ffmpeg -i trimmed.mp4 \
  -vf "scale=1280:720" \
  -c:v libx264 \
  -crf 28 \
  -preset slow \
  -an \
  -movflags +faststart \
  hero-bg.mp4
```
`-movflags +faststart` moves metadata to the front of the file so browsers
can start playing before the full download completes — this is the most
important flag for smooth hosted playback.

### Step 3 — encode WebM (loads even faster in Chrome/Firefox)
```
ffmpeg -i trimmed.mp4 \
  -vf "scale=1280:720" \
  -c:v libvpx-vp9 \
  -crf 35 \
  -b:v 0 \
  -an \
  hero-bg.webm
```

### Step 4 — extract poster frame (first frame as fallback image)
```
ffmpeg -i hero-bg.mp4 -vframes 1 -q:v 2 hero-bg.jpg
```

Drop all three files into `public/images/showroom/`.

---

## HandBrake (GUI alternative)

1. Open HandBrake → load your video
2. Preset: **Web → Gmail Large 3 Minutes 720p30**
3. Dimensions tab → set to 1280×720
4. Audio tab → **remove all audio tracks**
5. Start encode → rename output to `hero-bg.mp4`

---

## Cloudflare tip

If your site is on Cloudflare Pages, enable **Cloudflare Stream** or just
ensure the MP4 has `faststart` metadata (the FFmpeg flag above does this).
Cloudflare's CDN will serve the video from edge nodes close to the visitor,
which alone cuts buffering significantly.
