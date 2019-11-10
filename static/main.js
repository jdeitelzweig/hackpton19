var myTimer;
var myGraphOne;
var myGraphTwo;
var myGraphThree;
var colorGrad = ["#fffafa","#fef5f5","#fef0f0","#feebeb","#fee6e6","#fde1e1","#fddcdc","#fdd7d7","#fcd2d2","#fccdcd","#fcc8c8","#fbc3c3","#fbbfbe","#fbbab9","#fbb5b4","#fab0af","#faabaa","#faa6a5","#f9a1a0","#f99c9b","#f99796","#f99291","#f88d8c","#f88887","#f88382","#f77e7d","#f77978","#f77473","#f66f6e","#f66a69","#f66564","#f6605f","#f55b5a","#f55655","#f55150","#f44c4b","#f44746","#f44241","#f43e3c","#f33937","#f33432","#f32f2d","#f22a28","#f22523","#f2201e","#f11b19","#f11614","#f1110f","#f10c0a","#f00705"].reverse() +["#fafdfa","#f6fcf5","#f1faf0","#edf8eb","#e8f7e6","#e4f5e2","#dff3dd","#dbf2d8","#d6f0d3","#d2efce","#cdedc9","#c9ebc4","#c4eabf","#c0e8ba","#bbe6b5","#b7e5b1","#b2e3ac","#ade1a7","#a9e0a2","#a4de9d","#a0dc98","#9bdb93","#97d98e","#92d789","#8ed684","#89d480","#85d37b","#80d176","#7ccf71","#77ce6c","#73cc67","#6eca62","#6ac95d","#65c758","#60c553","#5cc44f","#57c24a","#53c045","#4ebf40","#4abd3b","#45bb36","#41ba31","#3cb82c","#38b727","#33b522","#2fb31e","#2ab219","#26b014","#21ae0f","#1dad0a"];
colorGrad = colorGrad.split(",");
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
      lineThickness: 5,
      markerSize: 2,
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

  var ideal = 130;
  var max = ideal/3;
  var diff = Math.abs(ideal-yVal);
  if(diff > max - 1) {
    diff = max - 1;
  }
  var index = 99-Math.floor(diff/max * 100);
  chart.options.data[0].lineColor = colorGrad[index];

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
    lineThickness: 5,
    markerSize: 2,
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

  var index = Math.floor(yVal/2 + 50);
  chart.options.data[0].lineColor = colorGrad[index];

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
    lineThickness: 5,
    markerSize: 2,
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

  
  var index = Math.floor(yVal);
  if (index > 99) {
    index = 99;
  }
  chart.options.data[0].lineColor = colorGrad[index];

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
