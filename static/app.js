
var recognition = null;
//var socket = io.connect('https://hackpton2019.appspot.com:5000/emit');
var wpms = [];
var sents_received = [];
var confidences = [];

var wc = 0;
var prevWC = 0;
var deltaWC = 0;
var sent = 0;
var confidence = 0;

// socket.on('nlp_sent', function(msg) {
//     console.log("Received sentiment: " + msg.sent);
//     sents_received.push(msg.sent);
// })

function makeRequest(transcript, words_per_minute, conf) {
    console.log("Making request");
    var newTranscript = {
        ts: transcript,
        wpm: words_per_minute,
        confidence: conf
    };
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            console.log("RECEIVED BACK: " + xmlhttp.responseText);
            sent = xmlhttp.responseText
            sents_received.push(parseFloat(xmlhttp.responseText));
            // UPDATE GRAPH HERE
        }
    }
    xmlhttp.open("POST", "/_transcript", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send(JSON.stringify(newTranscript));

    return false;
}

function setup() {
    const MAX_WPM = 190; // Maximum speech acceptable words per minute
    const MAX_WORDS = 4;
    const MIN_DELTA = 8;

    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition; // Setup speech recognition

    let finalTranscript = '';
    let currentWordCount = 0;
    let interimWordCount = 0;

    // Initialzie vars
    var wpm = 0; // words per minute
    var d = new Date();
    var startTime = d.getSeconds();
    var reset = true;

    // Setup the recognition object
    let recognition = new window.SpeechRecognition();
    recognition.interimResults = true;
    recognition.maxAlternatives = 10;
    recognition.continuous = true;
    recognition.onresult = (event) => {
        console.log("READING OUTPUT");
        let interimTranscript = '';

        // if (reset) {
        //     d = new Date();
        //     startTime = d.getSeconds();
        //     reset = false;
        // }
        for (let i = event.resultIndex, len = event.results.length; i < len; i+= 2) {
            let transcript = event.results[i][0].transcript;
            wc = (finalTranscript + transcript).split(" ").length;
            deltaWC = Math.abs(prevWC - wc);
            if (deltaWC < MIN_DELTA) {
                wc = prevWC;
            }
            else {
                // console.log("DELTA: " + deltaWC);
                prevWC = wc;
                // myTimer is global in main.js is a timer starting at 0 when you start recording
                wpm = (wc / secondsSinceStart) * 60;
                wpms.push(wpm);

                confidences.push(confidence);
                // console.log("CONFIDENCE: " + confidence);
                // console.log("About to make request");
                confidence = event.results[i][0].confidence;
                makeRequest(transcript, wpm, confidence);
                // console.log("TRANSCRIPT: " + transcript);
                // console.log("WC: " + wc);
                console.log("CONFIDENCE: " + confidence);
            }
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
            // if (event.results[i].isFinal) {
            //     interimWordCount = transcript.split(" ").length;
            //     finalTranscript += transcript;
            //     currentWordCount += interimWordCount;
            //     if (interimWordCount >= MAX_WORDS) {
            //         var newD = new Date();
            //         var endTime = newD.getSeconds();
            //         if (endTime < startTime) endTime += 60;
            //         wpm = (currentWordCount / (endTime - startTime)) * 60;
            //         wpms.push(wpm);
            //         confidences.push(confidence);
            //         console.log("CONFIDENCE: " + confidence);
            //         console.log("About to make request");
            //         makeRequest(transcript, wpm, confidence);
            //         console.log("TRANSCRIPT: " + transcript);
            //         currentWordCount = 0;
            //         reset = true;
            //     }
            // } else {
            //     interimTranscript += transcript;
            // }
        }
    }
    return recognition;
}

function startRecognition() {
    wc = 0;
    if (recognition == null) recognition = setup();
    recognition.start();
}
function stopRecognition() {
    if (recognition == null) console.log("ERROR: HAVE NOT YET DEFINED RECOGNITION");
    else recognition.stop();
}
