/**
 * @description
 * This script acts as a web API to receive data from a custom form
 * and save it to a Google Spreadsheet.
 * Designed to accept HTTP POST requests with a JSON payload.
 */

// --- CONFIGURATION ---
// Replace with your Spreadsheet ID.
// The ID can be found in the spreadsheet URL, e.g., https://docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit
const SPREADSHEET_ID = "REPLACE_WITH_YOUR_SPREADSHEET_ID";

// Replace with the name of the sheet (tab) in your spreadsheet where the data will be stored.
const SHEET_NAME = "Kritik & Saran";
// --------------------


/**
 * The main function that executes when a POST request is made to the web app URL.
 * @param {Object} e - The event object containing the request data.
 * @returns {ContentService.TextOutput} - A response in JSON format.
 */
function doPost(e) {
  try {
    // 1. Initial validation: Ensure the request contains data.
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Invalid request or request body is empty.");
    }

    // 2. Get and parse the JSON data from the request body.
    const data = JSON.parse(e.postData.contents);

    // 3. Data validation: Ensure that at least one of the required fields is present.
    // Here we assume that either 'kritik' or 'saran' must be provided.
    if (!data.kritik && !data.saran) {
      throw new Error("Data 'kritik' atau 'saran' wajib diisi.");
    }

    // 4. Open the target spreadsheet and sheet.
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);

    // If the sheet is not found, return an error.
    if (!sheet) {
      throw new Error(`Sheet with name "${SHEET_NAME}" was not found.`);
    }

    // 5. Prepare the data for the new row.
    const timestamp = new Date();
    // Use the value from the data payload or an empty string if it's not provided.
    const kritik = data.kritik || "";
    const saran = data.saran || "";

    // 6. Append the new row to the end of the sheet.
    // The order of this array must match the column order in your spreadsheet.
    sheet.appendRow([timestamp, kritik, saran]);

    // 7. Send a success response back to the client application.
    return createJsonResponse({
      status: "success",
      message: "Data berhasil diterima. Terima kasih atas masukan Anda!"
    });

  } catch (error) {
    // If any error occurs in the 'try' block, catch it and send an error response.
    return createJsonResponse({
      status: "error",
      message: "Gagal menyimpan data: " + error.message
    }, 400); // HTTP 400 for a bad request
  }
}

/**
 * A helper function to create a standard JSON response.
 * @param {Object} data - The JavaScript object to be stringified into JSON.
 * @param {number} [statusCode=200] - The HTTP status code (optional, defaults to 200).
 * @returns {ContentService.TextOutput} - The JSON response object.
 */
function createJsonResponse(data, statusCode = 200) {
  const output = ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  return output;
}
