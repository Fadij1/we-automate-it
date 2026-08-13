/**
 * Google Apps Script for Online Cloud Excel / Google Sheets Live Sync
 * -------------------------------------------------------------------
 * INSTRUCTIONS TO SET UP YOUR LIVE ONLINE SHEET IN 1 MINUTE:
 * 1. Open a new Google Sheet at https://sheets.new
 * 2. In the top menu, click Extensions -> Apps Script
 * 3. Delete any code in the editor, paste this entire file, and click Save (💾)
 * 4. Click Deploy -> New deployment
 * 5. Click the gear icon next to "Select type" -> Web app
 * 6. Set Description: "We Automate It Lead Intake"
 * 7. Set Execute as: "Me"
 * 8. Set Who has access: "Anyone"
 * 9. Click Deploy -> Authorize Access
 * 10. Copy the Web App URL (starts with https://script.google.com/macros/s/...)
 * 11. Paste that URL into your .env file as ONLINE_EXCEL_WEBHOOK_URL
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Ensure header row exists
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Phone Number", "Message / Scope", "Source"]);
      sheet.getRange(1, 1, 1, 6).setFontWeight("bold").setBackground("#0f172a").setFontColor("#38bdf8");
    }

    var data = JSON.parse(e.postData.contents);

    var timestamp = data.timestamp || new Date().toLocaleString();
    var name = data.name || "";
    var email = data.email || "";
    var phone = data.phone ? "'" + data.phone : "";
    var message = data.message || "";
    var source = data.source || "We Automate It Website";

    sheet.appendRow([timestamp, name, email, phone, message, source]);

    return ContentService.createTextOutput(JSON.stringify({
      "status": "success",
      "message": "Row added to Google Sheet successfully!"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "status": "error",
      "error": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("We Automate It - Google Sheets Webhook Engine is Active!");
}
