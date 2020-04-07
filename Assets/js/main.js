window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
const transcript_element = document.getElementById("transcript");
const talk_button = document.getElementById("start")
const end_button = document.getElementById("end")

const synth = window.speechSynthesis;

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
        tellTime(transcript);
        getJoke(transcript);
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

const speak = (action) => {
    utterThis = new SpeechSynthesisUtterance(action);
    synth.speak(utterThis);
};

const getJoke = () => {
    return fetch(`https://sv443.net/jokeapi/v2/joke/Any`)
    .then(response => response.json())
    .then(jokes => { console.log(jokes);
        console.log(jokes.type);
        
    

        if (jokes.type == "twopart") {
        var setup = jokes.setup;
        var punchline = jokes.delivery;
        console.log(setup);
        

        let jokesetup = document.createElement("jokesetup");  
        transcript_element.appendChild(jokesetup);
        jokesetup.textContent = setup;
        speak(setup);

        setTimeout( function () {
        
        let jokepunch = document.createElement("jokepunch");  
        transcript_element.appendChild(jokepunch);
        jokepunch.textContent = punchline;
        speak(punchline);

    }, 5000);

        } else {
            var jokeline = jokes.joke;
            let joke = document.createElement("joke");
            joke.textContent = jokeline;

        }



    })
};


async function tellTime(transcript) {
    if (transcript.includes("what is the time")) {
        t = getTime();
        let answer = document.createElement("answer");
        transcript_element.appendChild(answer);
        answer.textContent = t;
        console.log(t);
        speak(t);
        p.textContent = transcript;
    }
}

// async function tellJoke(transcript) {
//     if (transcript.includes("tell me a joke")) {
//         j = getJoke();
//         let joke = document.createElement("joke");
//         transcript_element.appendChild(joke);
//         joke.textContent = j;
        
//     }
// }

