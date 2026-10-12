# 🔪 Ghostface Movie Night Form

A spooky one-question form for residents to recommend a movie for Halloween movie night.

1. Someone opens your link.
2. A dark screen shows Ghostface with an "Incoming call" ringing.
3. They tap **Answer the Call**.
4. A low, slow voice asks: *"What's your favorite scary movie?"*
5. A text field appears for their answer (plus an optional name/room #).
6. Their response is saved to a Google Sheet.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole webpage — no build step, no dependencies. |
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

- **The question** — change `const LINE = ...` in `index.html`.
- **A real recorded voice** — the default uses the browser's built-in text-to-speech, pitched as low as it goes. For a creepier, consistent voice, record or generate an audio clip, add it to the repo (e.g. `ghostface.mp3`), and set `const VOICE_CLIP = "ghostface.mp3";`.
- **Ending message** — edit the "Good choice." section in `index.html`.

## Notes

- Browsers don't allow sound to play until the visitor taps something, which is exactly why the page uses the **Answer the Call** button. The ringtone starts after the first tap anywhere on the page, and the voice plays when they answer.
- Make sure phones aren't on silent mode, or they won't hear the voice. The question is also typed out on screen so nobody misses it.
- If you change `Code.gs` later, use **Deploy → Manage deployments → Edit → New version** so the same URL keeps working.
- Includes a hidden anti-spam field and protects the sheet against formula injection.
