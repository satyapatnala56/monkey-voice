import React, { useEffect, useState } from "react";
import classNames from "classnames";

import { SplittedText } from "../interfaces";
import { randomPara } from "../constants/string";
import classes from "./Affirmation.module.css";
import BlinkingCursor from "../components/BlinkingCursor";
import useSpeech from "../hooks/useSpeech";

const regex = /[.,\s]/g;

const cleanedPara = randomPara.replace(regex, " ");

const Affirmation = () => {
  const [text, setText] = useState<string>(randomPara);

  const [splittedText, setSplittedText] = useState<SplittedText>({
    before: "sd",
    after: randomPara,
  });

  const { wordsListened, startRecognition, isListening } = useSpeech({
    recognitionList: cleanedPara.split(" ").filter((char) => char !== ""),
  });

  useEffect(() => {
    if (wordsListened.length !== 0) {
      let splittedTextAfter = splittedText.after
        .replace(regex, " ")
        .split(" ")
        .filter((char) => char !== "");
      let i = 0;
      console.log(wordsListened, i);
      console.log(splittedTextAfter);

      while (
        wordsListened[i].toLowerCase() === splittedTextAfter[i].toLowerCase()
      ) {
        i++;
        if (i >= wordsListened.length || i >= splittedTextAfter.length) break;
      }
      setSplittedText((prev) => {
        return {
          before: prev.before + " " + splittedTextAfter.slice(0, i).join(" "),
          after: splittedTextAfter.slice(i).join(" "),
        };
      });
    }
  }, [wordsListened]);

  return (
    <div className="bg-primary text-default h-screen flex flex-col gap-2 items-center justify-center">
      <div
        className={classNames(classes.container, "text-xl", "text-unverified")}
      >
        <span className="text-verified"> {splittedText.before} </span>
        <BlinkingCursor />
        &nbsp;
        {splittedText.after}
      </div>
      <div
        className={classNames(
          "bg-secondary",
          "text-primary",
          "rounded",
          "py-1",
          "px-2"
        )}
        style={{
          transform: isListening ? "scale(1.5)" : "",
          transition: "all 0.3s ease-out",
        }}
        onClick={startRecognition}
      >
        {isListening ? "Listening" : "Listen"}
      </div>
    </div>
  );
};

export default Affirmation;
