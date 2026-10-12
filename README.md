# 🔪 Ghostface Movie Night Form

A spooky one-question form for residents to recommend a movie for Halloween movie night.

1. The page opens on a hand-sketched 1990s rotary phone, rattling and ringing with an old bell ringtone.
2. They tap **Answer the Call**.
3. The screen goes black and the caller's voice asks: *"What's your favorite scary movie?"*
4. A text box fades in and they type the movie's name.
5. They press **Enter**, and the answer is saved to a Google Sheet.
6. Ghostface raises the knife (plays once) while the caller says one last line, then *"See you at the movies..."* fades in.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole webpage, with no build step or dependencies. |
| `audio/ring.mp3` | Vintage telephone bell ringtone (synthesized, original). |
| `audio/voice.mp3` | The caller's line (supplied clip, with a short pause added at the start). |
| `audio/ending.mp3` | The caller's last line, played with the ending clip. |
| `images/ghostface.mp4` | Ending clip shown after they submit (plays once, no sound). |
| `images/ghostface.webm` | Same clip in WebM, for browsers that can't play the MP4. |
| `images/ghostface.webp` | Still frame shown if the clip can't play. |
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
- **Ending clip**: replace `images/ghostface.mp4` and `images/ghostface.webm` (plus `images/ghostface.webp`, its still backup).
- **Ending message**: edit the "See you at the movies" line in `index.html`.

## Notes

- Most browsers (especially phones) block sound until the visitor taps the page. The page tries to ring immediately; if the browser blocks it, a small "Tap anywhere for sound" hint appears and the ringing starts on the first tap. The voice always plays because it starts from the **Answer the Call** tap.
- Phones on silent mode won't play the voice. The text box still appears after the clip.
- **Phones:** works in phone browsers (Safari, Chrome, Samsung Internet, and in-app browsers like Instagram's). Phones only allow sound that starts from a tap or key press, so the ending clip and line are unlocked when someone taps the text box and start the moment they press Send. On phones the text box sits higher on the screen so the keyboard doesn't cover it, and the keyboard shows a **Send** key.
- The answer is sent in the background while the ending plays. If it fails (for example, no signal), a small note asks them to refresh and try again.
- If you change `Code.gs` later, use **Deploy → Manage deployments → Edit → New version** so the same URL keeps working.
- Includes a hidden anti-spam field and protects the sheet against formula injection.
