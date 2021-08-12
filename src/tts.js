const TTS = {};

TTS.say = (message) => {
    console.log("[TTS] Saying " + message);
    let ssu = new SpeechSynthesisUtterance();
    ssu.text = message;
    window.speechSynthesis.speak(ssu);
}