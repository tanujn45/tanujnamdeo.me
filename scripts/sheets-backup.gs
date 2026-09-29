/**
 * Weekly backup of the workout log into this spreadsheet.
 *
 * It does two jobs at once:
 *   1. Copies every set into a sheet you can read, edit and chart by hand.
 *   2. Writes a heartbeat row back to Supabase. That write is what keeps the
 *      free project from pausing after 7 days of inactivity, so you never
 *      have to unpause it from the dashboard.
 *
 * ---------------------------------------------------------------------------
 * SETUP (once)
 * ---------------------------------------------------------------------------
 * 1. Create a Google Sheet. Extensions → Apps Script. Paste this file in.
 * 2. Project Settings → Script Properties, add:
 *      SUPABASE_URL          https://<project-ref>.supabase.co
 *      SUPABASE_SERVICE_KEY  <the service_role key>
 *    Script Properties live on Google's servers. This key never reaches a
 *    browser. Do not put it in the website's code.
 * 3. Run `backupAndKeepAlive` once by hand and approve the permissions prompt.
 * 4. Triggers (clock icon) → Add Trigger:
 *      function: backupAndKeepAlive
 *      source:   Time-driven → Day timer (or Week timer)
 *    Daily is safer than weekly: it leaves room for a run to fail without the
 *    7-day pause window closing.
 */

const SHEET_NAME = "sets";

function backupAndKeepAlive() {
  const props = PropertiesService.getScriptProperties();
  const url = props.getProperty("SUPABASE_URL");
  const key = props.getProperty("SUPABASE_SERVICE_KEY");

  if (!url || !key) {
    throw new Error("Set SUPABASE_URL and SUPABASE_SERVICE_KEY in Script Properties.");
  }

  const headers = {
    apikey: key,
    Authorization: "Bearer " + key,
    "Content-Type": "application/json",
  };

  // ---- 1. Pull every set (paged, so it keeps working as history grows) ----
  const rows = [];
  const pageSize = 1000;
  let from = 0;

  while (true) {
    const res = UrlFetchApp.fetch(
      url + "/rest/v1/sets_export?select=*&order=performed_at.asc",
      {
        headers: Object.assign({}, headers, {
          Range: from + "-" + (from + pageSize - 1),
        }),
        muteHttpExceptions: true,
      }
    );

    if (res.getResponseCode() >= 300) {
      throw new Error("Supabase read failed: " + res.getContentText());
    }

    const page = JSON.parse(res.getContentText());
    rows.push.apply(rows, page);
    if (page.length < pageSize) break;
    from += pageSize;
  }

  // ---- 2. Rewrite the sheet ----
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  sheet.clear();

  const header = ["performed_at", "exercise", "weight", "unit", "reps", "volume", "id"];
  const values = [header];

  for (const r of rows) {
    values.push([
      r.performed_at,
      r.exercise,
      Number(r.weight),
      r.unit,
      Number(r.reps),
      Number(r.volume),
      r.id,
    ]);
  }

  sheet.getRange(1, 1, values.length, header.length).setValues(values);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, header.length).setFontWeight("bold");

  // ---- 3. Heartbeat, so the project counts as active ----
  const beat = UrlFetchApp.fetch(url + "/rest/v1/heartbeat?id=eq.1", {
    method: "patch",
    headers: Object.assign({}, headers, { Prefer: "return=minimal" }),
    payload: JSON.stringify({ beat_at: new Date().toISOString() }),
    muteHttpExceptions: true,
  });

  if (beat.getResponseCode() >= 300) {
    // The backup already succeeded, so don't fail the run — but do surface it,
    // because a silently dead heartbeat is how the project ends up paused.
    console.warn("Heartbeat failed: " + beat.getContentText());
  }

  console.log("Backed up " + rows.length + " sets.");
}
