const text='     welcome to stock analysis application'

export function speak (){
const utterance = new SpeechSynthesisUtterance(text);
speechSynthesis.speak(utterance)
}

