//replace SPREADSHEETS_ID with your speadsheets id 
PropertiesService.getScriptProperties().setProperty('mykey', 'SPREADSHEETS_ID'); //spreadsheets id
var myvalue = PropertiesService.getScriptProperties().getProperty('mykey'); //spreadsheets id

//main function
function myFunction() {
  setTableHeading();
  setDays(new Date('01/13/2020'),new Date('01/26/2020')); // season interval
  insertWeekResultsRow(9,new Date('01/13/2020'),new Date('01/19/2020')); //week 1
  insertWeekResultsRow(17,new Date('01/20/2020'),new Date('01/26/2020')); //week 2
  setTotalWorkHoursColumn(2,new Date('01/13/2020'),new Date('01/19/2020')); //week 1
  setTotalWorkHoursColumn(10,new Date('01/20/2020'),new Date('01/26/2020')); //week 2
}

//set table heading
function setTableHeading() {
  var sheet = SpreadsheetApp.openById(myvalue);
  var values = [["Respected Sleep Schedule","Study Hours","Esprit Hours","Pray","Gym","Total Work Hours","Alfa","Habit One","Note"]];
  var range = sheet.getRange("B1:J1").setValues(values).setFontWeight("bold");
}

//get difference between two dates
function getDateDiff(date1, date2) {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  Logger.log('getDateDiff returns : '+diffDays);
  return diffDays;
}

//set spreadsheets dates in A column
function setDays(startDate, endDate) {
  const diffDays =  getDateDiff(startDate, endDate);
  var currentDate = startDate;
  var j=0;
  var i=2;
  var sheet = SpreadsheetApp.openById(myvalue);
  while(j <= diffDays){
    sheet.getRange('A'+i).setValue(currentDate);
    currentDate.setDate(currentDate.getDate()+1);
    j++;
    i++;
  }
}

//insert week results row
function insertWeekResultsRow(rowIndex, startDate, endDate) {
  var sheet = SpreadsheetApp.openById(myvalue);
  var ssheet = sheet.getSheets()[0];
  var rule = "=SUM";
  const diffDays =  getDateDiff(startDate, endDate);
  var startRow = rowIndex - ( diffDays + 1 );
  var endRow = rowIndex - 1;
  ssheet.insertRows(rowIndex);
  sheet.getRange('A'+rowIndex).setValue('Week Results').setFontWeight("bold");
  sheet.getRange('B'+rowIndex).setValue(rule+"(B"+startRow+":B"+endRow+")");
  sheet.getRange('C'+rowIndex).setValue(rule+"(C"+startRow+":C"+endRow+")");
  sheet.getRange('D'+rowIndex).setValue(rule+"(D"+startRow+":D"+endRow+")");
  sheet.getRange('E'+rowIndex).setValue(rule+"(E"+startRow+":E"+endRow+")");
  sheet.getRange('F'+rowIndex).setValue(rule+"(F"+startRow+":F"+endRow+")");
  sheet.getRange('G'+rowIndex).setValue(rule+"(G"+startRow+":G"+endRow+")");
  sheet.getRange('H'+rowIndex).setValue(rule+"(H"+startRow+":H"+endRow+")");
  sheet.getRange('I'+rowIndex).setValue(rule+"(I"+startRow+":I"+endRow+")");
}

//set total work hours column
function setTotalWorkHoursColumn(rowIndex, startDate, endDate) {
  var sheet = SpreadsheetApp.openById(myvalue);
  const diffDays =  getDateDiff(startDate, endDate);
  var stop = diffDays+1;
  var rule = "=SUM";
  var j = 0;
  var i = rowIndex;
  while(j <= diffDays){
    sheet.getRange('G'+i).setValue(rule+"(C"+i+",D"+i+")");
    j++;
    i++;
  }
}


