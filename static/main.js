var myTimer;
var myGraphOne;
var myGraphTwo;
var myGraphThree;

function runTimer() {
  clearInterval(myTimer);
  myTimer = setInterval(myClock, 1000);
  var currentTime = new Date().getTime();
  function myClock () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = now - currentTime;

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
  backgroundColor: "darkgrey",
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
var updateInterval = 1000;
var dataLength = 20; // number of dataPoints visible at any point

var updateChart = function (count) {
  yVal = yVal + 1;
  dps.push({
    x: xVal,
    y: yVal
  });
  	xVal++;

	if (dps.length > dataLength) {
		dps.shift();
	}

  chart.backgroundColor = "blue";
	chart.render();
};

updateChart(dataLength);
myGraphOne = setInterval(function(){updateChart()}, updateInterval);

}

function runGraphSentiment () {

var dps = []; // dataPoints
var chart = new CanvasJS.Chart("chartContainer3", {
  backgroundColor: "darkgrey",
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
var updateInterval = 1000;
var dataLength = 20; // number of dataPoints visible at any point

var updateChart = function (count) {
  yVal = yVal + 1;
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

updateChart(dataLength);
myGraphThree = setInterval(function(){updateChart()}, updateInterval);

}

function runGraphClarity () {

var dps = []; // dataPoints
var chart = new CanvasJS.Chart("chartContainer2", {
  backgroundColor: "darkgrey",
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

var updateChart = function (count) {
  yVal = yVal + 1;
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

updateChart(dataLength);
myGraphTwo = setInterval(function(){updateChart()}, updateInterval);

}




document.getElementById("header").addEventListener("click", function() {
  runTimer();
  runGraphPace();
  runGraphClarity();
  runGraphSentiment();
  startRecognition();
});

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
