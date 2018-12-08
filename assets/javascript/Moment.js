//var trainName = "";
//var destination = "";
//var firstTrainTime = "";
//var frequency;
//var nextArrival;
//var minutesAway;
var numRows = 0;

$("#submit-btn").on("click", function(event) {
  event.preventDefault();
  numRows++;
  var trainName = $("#train-name").val();
  var destination = $("#destination").val();
  var firstTrainTime = $("#first-train-time").val();
  var frequency = $("#frequency").val();

  var currentTime = moment();
  var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(
    1,
    "years"
  );
  var diffTimeHour = moment().diff(moment(firstTrainTimeConverted), "hours");
  var diffTimeMin = moment().diff(moment(firstTrainTimeConverted), "minutes");
  var diffTotalTime = 60 * diffTimeHour + diffTimeMin;
  var minutesAway = frequency - (diffTotalTime % frequency);
  var nextArrival = moment()
    .add(minutesAway, "minutes")
    .format("HH:mm");

  var trainRow = $("<tr>").attr("class", "row-" + numRows);
  var trainNameTD = $("<td class='train-name'>").text(trainName);
  var destinationTD = $("<td class='destination'>").text(destination);
  var frequencyTD = $("<td class='frequency'>").text(frequency);
  var nextArrivalTD = $("<td class='next-arrival'>").text(nextArrival);
  var minutesAwayTD = $("<td class='minutes-away'>").text(minutesAway);

  trainRow.append(trainNameTD);
  trainRow.append(destinationTD);
  trainRow.append(frequencyTD);
  trainRow.append(nextArrivalTD);
  trainRow.append(minutesAwayTD);
  $("tbody").append(trainRow);
});
