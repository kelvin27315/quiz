import { css } from "hono/css";
import { type FC, useState } from "hono/jsx";
import { OldProvince } from "../data/data";

export const AnswerField: FC<{
  index: number;
  oldProvince: OldProvince;
  isAnswering: boolean;
  onAnswerChange: (kanji: string, reading: string) => void;
}> = ({ index, oldProvince, isAnswering, onAnswerChange }) => {
  const [input, setInput] = useState<string>("");
  const dataState = isAnswering
    ? undefined
    : input === oldProvince.reading
      ? "correct"
      : "incorrect";

  return (
    <div class={answerFieldClass}>
      <h3 data-state={dataState}>
        {index + 1}. {oldProvince.kanji}
      </h3>
      <label for="kanji">回答: </label>
      <input
        type="text"
        id="kanji"
        disabled={!isAnswering}
        data-state={dataState}
        onChange={(e) => {
          const target = e.target as HTMLTextAreaElement;
          onAnswerChange(oldProvince.kanji, target.value);
          setInput(target.value);
        }}
      />
      {!isAnswering && <p>答え: {oldProvince.reading}</p>}
    </div>
  );
};

const answerFieldClass = css`
  margin-bottom: 3rem;
  h3[data-state="incorrect"] {
    color: #FF0000;
  }
  input[data-state="incorrect"] {
    border-color: #FF0000;
  }
`;
