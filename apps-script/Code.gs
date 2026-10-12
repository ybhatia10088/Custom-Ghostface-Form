/**
 * Google Apps Script backend for the Ghostface movie-night form.
 *
 * Setup: open your Google Sheet -> Extensions -> Apps Script, paste this file,
 * then Deploy -> New deployment -> Web app (Execute as: Me, Who has access: Anyone).
 * See README.md for the full walkthrough.
 */

const SHEET_NAME = 'Responses';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const movie = clean_(data.movie, 200);
    if (!movie) return json_({ ok: false, error: 'missing movie' });

    const sheet = getSheet_();
    sheet.appendRow([new Date(), movie]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Lets you visit the web app URL in a browser to confirm it's deployed.
function doGet() {
  return ContentService.createTextOutput('Ghostface form backend is running.');
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Favorite Scary Movie']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Trim, cap length, and neutralize spreadsheet formula injection (=, +, -, @).
function clean_(value, maxLen) {
  let s = String(value || '').trim().slice(0, maxLen);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
