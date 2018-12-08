// Initialize Firebase
var config = {
  apiKey: "AIzaSyC3Bnvip6bvt2gN9kUa2FOiRvSaYfIisyk",
  authDomain: "my-first-project-dca58.firebaseapp.com",
  databaseURL: "https://my-first-project-dca58.firebaseio.com",
  projectId: "my-first-project-dca58",
  storageBucket: "my-first-project-dca58.appspot.com",
  messagingSenderId: "197544299923"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

$("#submit-btn").on("click", function(event) {
  event.preventDefault();
  //Gets values from text boxes
  var trainName = $("#train-name").val();
  var destination = $("#destination").val();
  var firstTrainTime = $("#first-train-time").val();
  var frequency = $("#frequency").val();

  //Pushes the values to the Firebase
  database.ref().push({
    TrainName: trainName,
    Destination: destination,
    FirstTrainTime: firstTrainTime,
    Frequency: frequency
  });
});

// Firebase watcher + initial loader
database.ref().on(
  "child_added",
  function(snapshot) {
    //Gets snapshot from Firebase and stores them as variables
    trainName = snapshot.val().TrainName;
    destination = snapshot.val().Destination;
    firstTrainTime = snapshot.val().FirstTrainTime;
    frequency = snapshot.val().Frequency;

    var firstTrainTimeConverted = moment(
      firstTrainTime,
      "HH:mm"
    ); /*.subtract(
      1,
      "years"
      );*/

    //Calculates how far the train is and determines next arrival time
    var diffTimeMin = moment().diff(moment(firstTrainTimeConverted), "minutes");
    console.log(diffTimeMin);
    if (diffTimeMin < 0) {
      var minutesAway = diffTimeMin * -1 + 1;
      var nextArrival = moment()
        .add(minutesAway, "minutes")
        .format("HH:mm");
    } else {
      var minutesAway = frequency - (diffTimeMin % frequency);
      var nextArrival = moment()
        .add(minutesAway, "minutes")
        .format("HH:mm");
    }

    //Makes table row and cells to store the train information
    var trainRow = $("<tr>");
    var trainNameTD = $("<td class='train-name'>").text(trainName);
    var destinationTD = $("<td class='destination'>").text(destination);
    var frequencyTD = $("<td class='frequency'>").text(frequency);
    var nextArrivalTD = $("<td class='next-arrival'>").text(nextArrival);
    var minutesAwayTD = $("<td class='minutes-away'>").text(minutesAway);

    console.log(minutesAway);
    trainRow.append(trainNameTD);
    trainRow.append(destinationTD);
    trainRow.append(frequencyTD);
    trainRow.append(nextArrivalTD);
    trainRow.append(minutesAwayTD);
    $("tbody").append(trainRow);
  },

  // Create Error Handling
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  }
);
