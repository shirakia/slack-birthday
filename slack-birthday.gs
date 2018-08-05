var spreadsheet_id = '';
var sheet_name = '';
var incoming_webhook = '';

function slackBirthday() {
  var spreadsheet = SpreadsheetApp.openById(spreadsheet_id);
  var sheet = spreadsheet.getSheetByName(sheet_name);
  var birthdays = sheet.getDataRange().getValues();
  var today = new Date();
  postIfBirthday(birthdays, today);
}

function postIfBirthday(birthdays, today) {
  for (var i = 0; i < birthdays.length; i++) {
    var birthday = birthdays[i][0]
    var name = birthdays[i][1]
    if (birthday.getMonth() === today.getMonth() && birthday.getDate() == today.getDate()) {
      var text = generateText(name);
      postMessage(text);
    }
  }
}

function generateText(name){
  return "hogehoge " + name;
}

function postMessage(text) {
  var options = {
    "method" : "POST",
    "headers": {"Content-type": "application/json"},
    "payload": '{"text":"' + text + '"}',
  };
  UrlFetchApp.fetch(incoming_webhook, options);
}
