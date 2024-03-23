import { useState } from "react";

const useSpeech = (props: any) => {
  const { recognitionList } = props;

  const [wordsListened, setWordsListened] = useState<Array<string>>([]);
  const [isListening, setIsListening] = useState(false);

  const isAvailable = "webkitSpeechRecognition" in window;

  const startRecognition = () => {
    let SpeechRecognition = (window as any).webkitSpeechRecognition;
    let SpeechGrammarList = (window as any).webkitSpeechGrammarList;
    let recognition = new SpeechRecognition();
    const localRecognitionList = new SpeechGrammarList();
    let grammar =
      "#JSGF V1.0; grammar moods; public <moods> = " +
      recognitionList.join(" | ") +
      ";";
    localRecognitionList.addFromString(grammar, 1);
    recognition.grammars = localRecognitionList;
    recognition.lang = "en-US";
    setIsListening(true);
    recognition.start();
    recognition.onresult = (event: any) => {
      //handle result in here
      let word = event.results[0][0].transcript;
      setWordsListened([...word.split(" ")]);
      console.log(event.results);
    };
    recognition.onsoundend = (event: any) => {
      recognition.stop();
      setIsListening(false);
    };
  };

  return { isAvailable, startRecognition, isListening, wordsListened };
};
export default useSpeech;
