/**
 * Google Apps Script backend for the Ghostface movie-night form.
 *
 * Setup: open your Google Sheet -> Extensions -> Apps Script, paste this file,
 * then Deploy -> New deployment -> Web app (Execute as: Me, Who has access: Anyone).
 * See README.md for the full walkthrough.
 */

const SHEET_NAME = 'Responses';

// Paste your Google Sheet's full link here (copy it from the browser's address
// bar), e.g. 'https://docs.google.com/spreadsheets/d/.../edit'. You can leave
// it empty only if you opened this script from the Sheet via
// Extensions -> Apps Script.
const SPREADSHEET_URL = '';

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

// Visit the web app URL in a browser to check the setup. It also creates the
// Responses tab, so you can see it's connected to the right Sheet.
function doGet() {
  try {
    const sheet = getSheet_();
    return ContentService.createTextOutput(
      'Ghostface form backend is running. Answers go to the "' + SHEET_NAME +
      '" tab of "' + sheet.getParent().getName() + '".');
  } catch (err) {
    return ContentService.createTextOutput(
      'Backend is running, but it can\'t write to your Sheet: ' + err.message);
  }
}

// Run this from the Apps Script editor (select testSave, click Run) to add a
// test row and confirm everything works.
function testSave() {
  getSheet_().appendRow([new Date(), 'TEST - delete me']);
}

function spreadsheet_() {
  if (SPREADSHEET_URL) return SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error('this script is not attached to a Sheet. ' +
      'Paste your Sheet\'s link into SPREADSHEET_URL at the top of the script, then deploy a new version.');
  }
  return ss;
}

function getSheet_() {
  const ss = spreadsheet_();
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
