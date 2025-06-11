# Frontend – Video Streaming App

A React-based user interface for uploading and playing videos via HLS streaming. Built with Flowbite-React components, HLS.js, and Video.js.

## Project Description

This front-end application provides:

- **Video Upload UI**: Users can select and upload video files, see upload progress, and receive feedback.
- **Video Playback**: Plays HLS streams with adaptive bitrate support via HLS.js and Video.js.
- **Video ID Control**: Enter any valid `videoId` to load and play its HLS stream.

---

## Features

- File selection and validation before upload.
- Upload progress bar with percentage and status messages.
- Title and description form inputs for metadata.
- Responsive Video.js player with HLS.js fallback.
- Input field to change `videoId` on the fly.
- Toast notifications for success/failure.

---

## Technologies Used

- **React**
- **Flowbite-React** for UI components
- **Tailwind CSS** (via Flowbite)
- **HLS.js** for HLS playback
- **Video.js** for video player UI
- **Axios** for HTTP requests
- **React Toastify** for notifications
