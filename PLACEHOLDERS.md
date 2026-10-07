# BAHINA GROUP — Missing Assets & Placeholders

This file tracks media assets and optional captions for the BAHINA Group website.

## 1. Welcome Video & Captions (public/video/)

The website includes a full-screen Welcome Video Overlay with native recorded voice:
- **Video**: `public/video/welcome.mp4` (Found: 21,124,609 bytes / 20.15 MB, Duration: 8.07 seconds)
- **Poster**: `public/video/welcome-poster.jpg` (Found: 77,978 bytes / 76.1 KB, under 80KB)

The following caption files are supported. When provided, the captions toggle button automatically appears on the overlay:

| File Path | Description | Recommended Specs | Status |
| :--- | :--- | :--- | :---: |
| `public/video/welcome-mr.vtt` | Marathi WebVTT Subtitles / Captions | WebVTT format, UTF-8 encoded | **Missing / Awaiting File** |
| `public/video/welcome-en.vtt` | English WebVTT Subtitles / Captions | WebVTT format, UTF-8 encoded | **Missing / Awaiting File** |

*Note: The website performs a clean `HEAD` check on load. If `.vtt` caption files are not yet placed in `public/video/`, the captions toggle button gracefully remains hidden without throwing errors or breaking playback.*

## 2. Contact Phone & WhatsApp Configuration
To avoid inventing contact numbers, direct Call and WhatsApp quick-action buttons are configured in `src/config.js`:
- `phoneNumber`: Currently `""` (Set to real phone number e.g. `+919822000000` to activate the direct call button).
- `whatsappNumber`: Currently `""` (Set to WhatsApp number e.g. `919822000000` to activate the direct WhatsApp button).
