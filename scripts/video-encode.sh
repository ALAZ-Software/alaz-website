#!/usr/bin/env bash
# Encode a background loop for the site.
#
#   scripts/video-encode.sh <input.mp4> <name> [--loop SECONDS] [--no-av1] [--upscale]
#
# Writes public/videos/<name>/<name>-{720,1080,1440}.mp4 (H.264), the same with .av1.mp4
# (10-bit AV1, no banding in dark gradients) and poster.webp. Every variant:
#   - drops the audio track (Flow/Veo clips carry one),
#   - optionally turns the clip into a seamless loop by cross-fading its tail over its head,
#   - pins the blacks to the page ink (#0a0a0a) so the video never shows as a rectangle,
#   - keeps the grain (it hides banding), 24 fps as delivered, faststart for streaming.
# A size larger than the source is skipped unless --upscale is given.
set -euo pipefail

usage() { sed -n '2,14p' "$0"; exit 1; }
[ $# -ge 2 ] || usage
IN=$1; NAME=$2; shift 2
LOOP=0; AV1=1; UPSCALE=0
while [ $# -gt 0 ]; do
  case $1 in
    --loop) LOOP=$2; shift 2 ;;
    --no-av1) AV1=0; shift ;;
    --upscale) UPSCALE=1; shift ;;
    *) usage ;;
  esac
done

ROOT=$(cd "$(dirname "$0")/.." && pwd)
OUT="$ROOT/public/videos/$NAME"
mkdir -p "$OUT"

read -r W H DUR < <(ffprobe -v error -select_streams v:0 -show_entries stream=width,height:format=duration -of csv=p=0 "$IN" | tr '\n,' '  ' | awk '{print $1, $2, $3}')
echo "source: ${W}x${H}, ${DUR}s"

# 1) grade: crush noise below 2% to black, then lift black to the page ink (10/255 = 0.039).
GRADE="colorlevels=rimin=0.02:gimin=0.02:bimin=0.02:romin=0.039:gomin=0.039:bomin=0.039"

# 2) loop: the last LOOP seconds fade over the first LOOP seconds; the clip gets LOOP seconds shorter.
if awk "BEGIN{exit !($LOOP > 0)}"; then
  OFFSET=$(awk "BEGIN{print $DUR - 2 * $LOOP}")
  FILTER="[0:v]${GRADE},split[a][b];[a]trim=start=${LOOP},setpts=PTS-STARTPTS[main];[b]trim=duration=${LOOP},setpts=PTS-STARTPTS[head];[main][head]xfade=transition=fade:duration=${LOOP}:offset=${OFFSET}[v]"
else
  FILTER="[0:v]${GRADE}[v]"
fi

encode() { # height codec
  local h=$1 codec=$2 file
  if [ "$UPSCALE" = 0 ] && [ "$h" -gt "$H" ]; then echo "skip ${h}p (source is ${H}p)"; return; fi
  if [ "$codec" = h264 ]; then
    file="$OUT/$NAME-$h.mp4"
    ffmpeg -v error -y -i "$IN" -filter_complex "${FILTER};[v]scale=-2:${h}:flags=lanczos[s]" -map '[s]' -an \
      -c:v libx264 -preset slow -crf 22 -tune film -pix_fmt yuv420p -g 48 -movflags +faststart "$file"
  else
    file="$OUT/$NAME-$h.av1.mp4"
    ffmpeg -v error -y -i "$IN" -filter_complex "${FILTER};[v]scale=-2:${h}:flags=lanczos[s]" -map '[s]' -an \
      -c:v libsvtav1 -preset 6 -crf 34 -pix_fmt yuv420p10le -g 240 -svtav1-params tune=0 -movflags +faststart "$file" 2> >(grep -v "Svt\[info\]" >&2)
  fi
  printf '%-40s %6.2f MB\n' "$(basename "$file")" "$(awk "BEGIN{print $(stat -c %s "$file") / 1048576}")"
}

for h in 720 1080 1440; do
  encode "$h" h264
  [ "$AV1" = 1 ] && encode "$h" av1
done

# 3) poster: the first graded frame, 1920 wide, WebP.
ffmpeg -v error -y -i "$IN" -filter_complex "${FILTER};[v]scale=1920:-2:flags=lanczos[s]" -map '[s]' -frames:v 1 -c:v libwebp -quality 72 "$OUT/poster.webp"
printf '%-40s %6.2f MB\n' poster.webp "$(awk "BEGIN{print $(stat -c %s "$OUT/poster.webp") / 1048576}")"
echo "done: $OUT"
