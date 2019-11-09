
var recognition = null;
var socket = io.connect('http://localhost:5000/emit');
var wpms = [];
var sents_received = [];
var confidences = [];

socket.on('nlp_sent', function(msg) {
    console.log("Received sentiment: " + msg.sent);
    sents_received.push(msg.sent);
})

function makeRequest(transcript, words_per_minute, conf) {
    console.log("Making request");
    var newTranscript = {
        ts: transcript,
        wpm: words_per_minute,
        confidence: conf
    };
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/_transcript", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send(JSON.stringify(newTranscript));
    
    return false;
}

function setup() {
    const MAX_WPM = 190; // Maximum speech acceptable words per minute
    const MAX_WORDS = 4;

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
        
        if (reset) {
            d = new Date();
            startTime = d.getSeconds();
            reset = false;
        }

        for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
            let transcript = event.results[i][0].transcript;
            let confidence = event.results[i][0].confidence;
            if (event.results[i].isFinal) {
                interimWordCount = transcript.split(" ").length;
                finalTranscript += transcript; currentWordCount += interimWordCount;
                if (interimWordCount >= MAX_WORDS) {
                    var newD = new Date();
                    var endTime = newD.getSeconds();
                    if (endTime < startTime) endTime += 60;
                    wpm = (currentWordCount / (endTime - startTime)) * 60;
                    wpms.push(wpm);
                    confidences.push(confidence);
                    console.log("CONFIDENCE: " + confidence);
                    console.log("About to make request");
                    makeRequest(transcript, wpm, confidence);
                    console.log("TRANSCRIPT: " + transcript);
                    currentWordCount = 0;
                    reset = true;
                }
            } else {
                interimTranscript += transcript;
            }
        }
    }
    return recognition;
}

function startRecognition() {
    if (recognition == null) recognition = setup();
    recognition.start();
}
function stopRecognition() {
    if (recognition == null) console.log("ERROR: HAVE NOT YET DEFINED RECOGNITION");
    else recognition.stop();
}
