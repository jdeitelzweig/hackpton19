// function getWPM() {
//     const MAX_WPM = 190; // Seems to work

//     window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
//     let finalTranscript = '';
//     let count = 0;
//     let n = 0;
//     let recognition = new window.SpeechRecognition();
//     var wpm = 0;
//     var d = new Date();
//     var startTime = d.getSeconds();
//     var reset = true;
//     recognition.interimResults = true;
//     recognition.maxAlternatives = 10;
//     recognition.continuous = true;
//     recognition.onresult = (event) => {
//         if (reset) {
//             d = new Date();
//             startTime = d.getSeconds();
//             reset = false;
//         }
//         let interimTranscript = '';
//         for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
//             let transcript = event.results[i][0].transcript;
//             if (event.results[i].isFinal) {
//                 n = transcript.split(" ").length;
//                 finalTranscript += transcript; count += n;
//                 if (count >= 5) {
//                     var newD = new Date();
//                     var endTime = newD.getSeconds();
//                     if (endTime < startTime) endTime += 60;
//                     wpm = (count / (endTime - startTime)) * 60;
//                     makeRequest(finalTranscript, wpm);
//                     // if (wpm > MAX_WPM) {
//                     //     document.querySelector('body').setAttribute("style", "background-color:red");
//                     // }
//                     // else {
//                     //     document.querySelector('body').setAttribute("style", "background-color:green");
//                     // }
//                     count = 0;
//                     reset = true;
//                 }
//             } else {
//                 interimTranscript += transcript;
//             }
//         }
//         document.querySelector('body').innerHTML = count + ", " + wpm + ", " + startTime + ", " + endTime + "\n" + finalTranscript + " " + interimTranscript;
//     }
//     recognition.start();
// }

var recognition = null;

function makeRequest(transcript, words_per_minute) {
    console.log("Making request");
    var newTranscript = {
        ts: transcript,
        wpm: words_per_minute
    };
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/_transcript", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send(JSON.stringify(newTranscript));
    
    return false;
}

function setup() {
    const MAX_WPM = 190; // Maximum speech acceptable words per minute
    const NUM_WORD_SPLITTER = 7; // Checks wpm everytime more than this many words are read.

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
            if (event.results[i].isFinal) {
                interimWordCount = transcript.split(" ").length;
                finalTranscript += transcript; currentWordCount += interimWordCount;
                if (interimWordCount >= NUM_WORD_SPLITTER) {
                    var newD = new Date();
                    var endTime = newD.getSeconds();
                    if (endTime < startTime) endTime += 60;
                    wpm = (currentWordCount / (endTime - startTime)) * 60;
                    console.log("About to make request");
                    makeRequest(transcript, wpm);
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
