

  var config = {
    apiKey: "AIzaSyDVk9XTzAvTOFiJJeBcRKSxxBrAjQrRVMo",
    authDomain: "train-schedule-4e379.firebaseapp.com",
    databaseURL: "https://train-schedule-4e379.firebaseio.com",
    projectId: "train-schedule-4e379",
    storageBucket: "train-schedule-4e379.appspot.com",
    messagingSenderId: "900469211101"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

var name = ""; 

var destination = ""; 

var time = "";

var frequency = "";

$('#add-train').on('click', function(){

    name = $('#name-input').val();

    destination = $('#dest-input').val();

    time = $('#time-input').val().trim();

    frequency = $('#freq-input').val().trim();


    console.log("name: "+ name, "dest: " + destination,"time: " + time, "freq: " + frequency);

if (name!="" && destination!="" && time!="" && frequency!="") {

    $('#name-input').val("");

    $('#dest-input').val("");

    $('#time-input').val("");

    $('#freq-input').val("");


    database.ref().push({

        name,

        destination,

        time,

        frequency

    });

} else {

    alert("All fields have not been filled in.")

};   

})

database.ref().on("value", function(snapshot) {

    $('#show-trains').empty()



    console.log(snapshot.val());


  snapshot.forEach(function(childSnapshot){

      

      var newName = childSnapshot.val().name;

      var newDest = childSnapshot.val().destination;

      var newTime = childSnapshot.val().time;

      var newFreq = childSnapshot.val().frequency;

      

      console.log(newName, newDest, newTime, newFreq);


    var trainTimeConverted = moment(newTime, "hh:mm").subtract(1, "years");

    console.log(trainTimeConverted);

    
    var currentTime = moment();

    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

     

    var timeDiff = moment().diff(moment(trainTimeConverted), "minutes");

    console.log("DIFFERENCE IN TIME: " + timeDiff);


    var timeApart = timeDiff % newFreq;

    console.log(timeApart);

    var arrivalTrain = newFreq - timeApart;

    console.log("MINUTES TILL TRAIN: " + arrivalTrain);


    var nextTrain = moment().add(arrivalTrain, "minutes");

    var nextTrainTimeConverted = moment(nextTrain).format("hh:mm");

    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      var showName = $('<th scope="row">').text(newName);

      var showDest = $('<td>').text(newDest);

      var showFreq = $('<td>').text(newFreq);

      var showDist = $('<td>').text(nextTrainTimeConverted);

      var showMin = $('<td>').text(arrivalTrain);


      var row = $('<tr>').append(showName, showDest, showFreq, showDist, showMin);

      $('#show-trains').prepend(row);

    
        });

    },

    
    function(errorObject) {

    console.log("The read failed: " + errorObject.code);

    });

