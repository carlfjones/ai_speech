window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
const transcript_element = document.getElementById("transcript");
const talk_button = document.getElementById("start")
const end_button = document.getElementById("end")

let p = document.createElement("p");
transcript_element.appendChild(p);

recognition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript);
    console.log(transcript);

    p.textContent = transcript;
    if (e.results[0].isFinal) {
        p = document.createElement("p");
        p.textContent = transcript;
        if (transcript.includes("what is the time")) {
            t = getTime();
            let answer = document.createElement("answer")
            transcript_element.appendChild(answer);
            answer.textContent = t;
            console.log(t);
            p.textContent = transcript;
        ;
            
        }
        transcript_element.appendChild(p)
        p.textContent = "";
    }
    
});


talk_button.addEventListener("click", () => {
    end_button.disabled = false;
    talk_button.disabled = true;
    recognition.start()
});

end_button.addEventListener("click", () => {
    end_button.disabled = true;
    talk_button.disabled = false;
    recognition.stop()

});


function getTime() {
    const time = new Date(Date.now());
    return `the time is ${time.toLocaleString('en-UK', { hour: 'numeric', minute: 'numeric', hour12: true })}`
};
