# Home hero: scroll video

## Concept

A sketchbook lies open on a desk. The blue-roofed classical building is drawn on the page in watercolor and ink. The camera pushes into the page, engineering lines appear, then the real building render takes over. Vision... Built.

The building must be a real Archi Hub project, with the client's permission to use its images.

## Keyframes

| Frame | What | Made by |
|---|---|---|
| A | Desk with an open sketchbook, blank pages | AI image model |
| B | Page with the building sketched, same framing as D | AI image model, then composited onto A's pages |
| C | Engineering lines over the building (optional) | Real software output if available, otherwise edge detection, labeled illustrative |
| D | Clean render of the real building, no people, no cars | The company's real render, high resolution |

Pipeline: AI video tool makes A -> B (start and end frame push-in). B -> C -> D are ffmpeg blends and wipes between same-framed images, so geometry never warps.

## Files

Place in `public/video/`:
- `hero-scrub.mp4` (desktop)
- `hero-scrub-mobile.mp4` (under 768px)
- `hero-poster-start.jpg`
- `hero-poster-end.jpg`

Encoding for scrubbing: `-crf 27 -g 3 -bf 0`, no audio. Each frame must be easy to seek.

## Behavior

- Section height about 300vh, with a sticky 100vh inner block.
- ScrollTrigger scrub maps progress to `video.currentTime`, smoothed with a lerp.
- Mobile source under 768px.
- Poster shown until metadata loads. If the video is not ready after 4s, show the poster.
- `prefers-reduced-motion`: show `hero-poster-end.jpg`, no scrub.
- Lenis connected to ScrollTrigger as described in `CLAUDE.md`.
- The glass stat card floats over the hero only. Text uses a play-once blur-in (motion library, not GSAP).

## Status

The current video is temporary. Replace it when the Archi Hub video is ready.
