var myTimer;
var myGraphOne;
var myGraphTwo;
var myGraphThree;
var secondsSinceStart;

function runTimer() {
  clearInterval(myTimer);
  myTimer = setInterval(myClock, 1000);
  console.log(myTimer);
  var currentTime = new Date().getTime();
  function myClock () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = now - currentTime;
    secondsSinceStart = Math.floor(distance / 1000);

    // Time calculations for days, hours, minutes and seconds
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("timer").innerHTML = "Time\n" + hours + "h "
    + minutes + "m " + seconds + "s ";
  }
}

function runGraphPace () {

var dps = []; // dataPoints
var chart = new CanvasJS.Chart("chartContainer", {
  title :{
  	text: "Words Per Minute"
  	},
  	axisY: {
  		includeZero: false
  	},
  	data: [{
  		type: "line",
  		dataPoints: dps
  	}]
  });

var xVal = 0;
var yVal = 100;
var updateInterval = 2000;
var dataLength = 20; // number of dataPoints visible at any point
var counter = 0;
var avgWPM = 0;


var updateChartPace = function (count) {
  yVal = (wc / secondsSinceStart) * 60;
  dps.push({
    x: xVal,
    y: yVal
  });
  	xVal++;

	if (dps.length > dataLength) {
		dps.shift();
	}

	chart.render();
};

updateChartPace(dataLength);
myGraphOne = setInterval(function(){updateChartPace()}, updateInterval);

}

function runGraphSentiment () {

var dps = []; // dataPoints
var chart = new CanvasJS.Chart("chartContainer3", {
	title :{
		text: "Sentiment Score"
	},
	axisY: {
		includeZero: false
	},
	data: [{
		type: "line",
		dataPoints: dps
	}]
});

var xVal = 0;
var yVal = 100;
var updateInterval = 5000;
var dataLength = 20; // number of dataPoints visible at any point

var updateChartSentiment = function (count) {
  yVal = sent * 100;
  dps.push({
    x: xVal,
    y: yVal
  });
  	xVal++;

	if (dps.length > dataLength) {
		dps.shift();
	}

	chart.render();
};

updateChartSentiment(dataLength);
myGraphThree = setInterval(function(){updateChartSentiment()}, updateInterval);

}

function runGraphClarity () {

var dps = []; // dataPoints
var chart = new CanvasJS.Chart("chartContainer2", {
	title :{
		text: "Clarity Score"
	},
	axisY: {
		includeZero: false
	},
	data: [{
		type: "line",
		dataPoints: dps
	}]
});

var xVal = 0;
var yVal = 100;
var updateInterval = 1000;
var dataLength = 20; // number of dataPoints visible at any point

var updateChartClarity = function (count) {
  yVal = confidence * 100;
  dps.push({
    x: xVal,
    y: yVal
  });
  	xVal++;

	if (dps.length > dataLength) {
		dps.shift();
	}

	chart.render();
};

updateChartClarity(dataLength);
myGraphTwo = setInterval(function(){updateChartClarity()}, updateInterval);

}

function beginTesting() {
  runTimer();
  runGraphPace();
  runGraphClarity();
  runGraphSentiment();
  startRecognition();
}

function endTesting() {
  // var xmlhttp = new XMLHttpRequest();
  // xmlhttp.open("POST", "/_transcript", true);
  // xmlhttp.setRequestHeader('Content-Type', 'application/json');
  // xmlhttp.send(JSON.stringify({"test":"abc", "t2s":"wpm"}));
  clearInterval(myTimer);
  clearInterval(myGraphOne);
  clearInterval(myGraphTwo);
  clearInterval(myGraphThree);
  stopRecognition();
}
// Get the element with id="defaultOpen" and click on it
// document.getElementById("defaultOpen").click();
