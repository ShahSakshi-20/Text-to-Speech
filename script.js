const textarea = document.getElementById("text");
const voiceList = document.getElementById("voice");
const speakBtn = document.getElementById("speak-btn");
const pauseBtn = document.getElementById("pause-btn");
const resumeBtn = document.getElementById("resume-btn");

let synth = window.speechSynthesis;
let utterance;
let isPaused = false;

function populateVoiceList() {
    voiceList.innerHTML = "";
    const voices = synth.getVoices();
    for (let i = 0; i < voices.length; i++) {
        const option = document.createElement("option");
        option.textContent = `${voices[i].name} (${voices[i].lang})`;
        option.setAttribute("value", i);
        voiceList.appendChild(option);
    }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speakText() {
    if (!utterance) {
        utterance = new SpeechSynthesisUtterance();
    }
    utterance.text = textarea.value;
    const selectedVoiceIndex = voiceList.value;
    utterance.voice = synth.getVoices()[selectedVoiceIndex];
    synth.speak(utterance);
}

speakBtn.addEventListener("click", () => {
    if (synth.speaking) {
        synth.cancel();
    }
    speakText();
});

pauseBtn.addEventListener("click", () => {
    if (synth.speaking && !isPaused) {
        synth.pause();
        isPaused = true;
    }
});

resumeBtn.addEventListener("click", () => {
    if (isPaused) {
        synth.resume();
        isPaused = false;
    }
});
