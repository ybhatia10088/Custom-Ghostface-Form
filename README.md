# 🔪 Ghostface Movie Night Form

A spooky one-question form for residents to recommend a movie for Halloween movie night.

1. The page opens on a hand-sketched 1990s rotary phone, rattling and ringing with an old bell ringtone.
2. They tap **Answer the Call**.
3. The screen goes black and the caller's voice asks: *"What's your favorite scary movie?"*
4. A text box fades in and they type the movie's name.
5. They press **Enter**, and the answer is saved to a Google Sheet.
6. A dark Ghostface image fades in with *"See you at the movies..."* across it.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole webpage, with no build step or dependencies. |
| `audio/ring.mp3` | Vintage telephone bell ringtone (synthesized, original). |
| `audio/voice.mp3` | The caller's line (supplied clip, with a short pause added at the start). |
| `images/ghostface.webp` | Ending image shown after they submit. |
| `apps-script/Code.gs` | The tiny backend that writes answers into your Google Sheet. |

## Setup (about 10 minutes)

### 1. Connect the Google Sheet

1. Create a new Google Sheet (e.g. "Movie Night Picks").
2. In the sheet, go to **Extensions → Apps Script**.
3. Delete whatever is in `Code.gs` and paste in the contents of `apps-script/Code.gs` from this repo. Click **Save**.
4. Click **Deploy → New deployment**.
   - Click the gear ⚙️ next to "Select type" and choose **Web app**.
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Click **Deploy**, approve the permissions prompt (Google will warn that the app is unverified — click *Advanced → Go to project* since it's your own script).
6. Copy the **Web app URL** (it ends in `/exec`).

A `Responses` tab with headers is created automatically on the first submission.

### 2. Plug the URL into the page

Open `index.html` and replace the placeholder near the bottom:

```js
const SCRIPT_URL = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";
```

with the URL you copied.

### 3. Publish the page (free, with GitHub Pages)

1. Commit and push `index.html` to the `main` branch of this repo.
2. On GitHub, go to **Settings → Pages**.
3. Under "Build and deployment", choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
4. After a minute your link will be `https://<your-username>.github.io/Custom-Ghostface-Form/`.

Share that link (or turn it into a QR code for flyers in the hallway).

## Customizing

- **The voice**: replace `audio/voice.mp3` with any clip you have the rights to use. A fun option is to
  record yourself (or an RA) through a Ghostface voice-changer mask/toy saying the line. The text box
  appears as soon as the clip finishes.
- **The ringtone**: replace `audio/ring.mp3` (it loops until they answer).
- **Ending image**: replace `images/ghostface.webp`, or drop in an animated GIF and point the `<img>` in `index.html` at it.
- **Ending message**: edit the "See you at the movies" line in `index.html`.

## Notes

- Most browsers (especially phones) block sound until the visitor taps the page. The page tries to ring immediately; if the browser blocks it, a small "Tap anywhere for sound" hint appears and the ringing starts on the first tap. The voice always plays because it starts from the **Answer the Call** tap.
- Phones on silent mode won't play the voice. The text box still appears after the clip.
- If you change `Code.gs` later, use **Deploy → Manage deployments → Edit → New version** so the same URL keeps working.
- Includes a hidden anti-spam field and protects the sheet against formula injection.
