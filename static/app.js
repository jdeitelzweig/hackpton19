const MAX_WPM = 190; // Seems to work

window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
let finalTranscript = ''; 
let count = 0; 
let n = 0;
let recognition = new window.SpeechRecognition();
var wpm = 0;
var d = new Date();
var startTime = d.getSeconds();
var reset = true;
recognition.interimResults = true;
recognition.maxAlternatives = 10;
recognition.continuous = true;
recognition.onresult = (event) => {
    if (reset) {
        d = new Date();
        startTime = d.getSeconds();
        reset = false;
    }
    let interimTranscript = '';
    for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
        let transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
            n = transcript.split(" ").length;
            finalTranscript += transcript; count += n;
            if (count >= 5) {
                var newD = new Date();
                var endTime = newD.getSeconds();
                if (endTime < startTime) endTime += 60;
                wpm = (count / (endTime - startTime)) * 60;
                if (wpm > MAX_WPM) {
                    document.querySelector('body').setAttribute("style", "background-color:red");
                }
                else {
                    document.querySelector('body').setAttribute("style", "background-color:green");
                }
                count = 0;
                reset = true;
            }
        } else {
            interimTranscript += transcript;
        }
    }
    document.querySelector('body').innerHTML = count + ", " + wpm + ", " + startTime + ", " + endTime + "\n" + finalTranscript + " " + interimTranscript;
}
recognition.start();