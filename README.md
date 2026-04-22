# Video

Video content element with file upload and embed URL support (YouTube, Vimeo, Google Drive).

**Type:** `VIDEO`

## Data

| Field | Type | Description |
|-------|------|-------------|
| `url` | `string \| null` | Public video URL or embed source |
| `assets` | `{ url?: string }` | Uploaded asset reference |

## Edit

- Video preview with embedded iframe for supported services (YouTube, Vimeo, Google Drive) or HTML5 `<video>` for direct files
- Upload button in top toolbar (MP4, WEBM, MOV) with URL source support

## Display

- Renders the video with native controls
- Embeds third-party players for supported services
- Emits `interaction` event with `{ currentTime, furthestTime }` on playback,
  throttled during playback and debounced on seek

## Development

```sh
pnpm dev     # Preview :8080 | Edit :8010 | Display :8020 | Server :8030
pnpm build
pnpm lint
pnpm test
```

## Run with Docker

```sh
docker compose up
```
