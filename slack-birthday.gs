var spreadsheet_id = '';
var birthdays_sheet_name = '';
var messages_sheet_name = '';
var incoming_webhook = '';

function slackBirthday() {
  var spreadsheet = SpreadsheetApp.openById(spreadsheet_id);
  var birthdays = spreadsheet.getSheetByName(birthdays_sheet_name).getDataRange().getValues();
  var messages = spreadsheet.getSheetByName(messages_sheet_name).getDataRange().getValues();
  var today = new Date();

  postIfBirthday(today, birthdays, messages);
}

function postIfBirthday(today, birthdays, messages) {
  for (var i = 0; i < birthdays.length; i++) {
    var birthday = birthdays[i][0];
    var name = birthdays[i][1];

    if (birthday.getMonth() === today.getMonth() && birthday.getDate() == today.getDate()) {
      var message = generateMessage(name, messages);
      postMessage(message);
    }
  }
}

function generateMessage(name, messages){
  var message = messages[Math.floor(Math.random() * messages.length)];
  var message_with_name = message[0].replace('name', name);
  return '<!channel> ' + message_with_name;
}

function postMessage(message) {
  var options = {
    "method" : "POST",
    "headers": {"Content-type": "application/json"},
    "payload": '{"text":"' + message + '"}',
  };
  UrlFetchApp.fetch(incoming_webhook, options);
}
