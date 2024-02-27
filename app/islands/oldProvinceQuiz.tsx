import { css } from "hono/css";
import { useState } from "hono/jsx";
import type { FC } from "hono/jsx";
import { AnswerField } from "../components/answerField";
import { TwitterShareButton } from "../components/twitterShareButton";
import { OldProvince, oldProvinces } from "../data/data";

const Answer: FC<{ answers: { [key in string]: string } }> = ({ answers }) => {
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const calculateCorrectAnswers = oldProvinces.reduce((count, province) => {
    if (answers[province.kanji] === province.reading) {
      return count + 1;
    }
    return count;
  }, 0);

  const passRate = (calculateCorrectAnswers / oldProvinces.length) * 100;
  const postText = `旧国名読みテスト 正解率 ${
    passRate / 0.1 === 0 ? "" : "約"
  }${passRate.toFixed(1)}%`;

  return (
    <div>
      <h1>成績発表</h1>
      <h3>
        {oldProvinces.length}問中 {calculateCorrectAnswers}問正解
      </h3>
      <h3>
        正解率: {passRate / 0.1 === 0 ? "" : "約"}
        {passRate.toFixed(1)}%
      </h3>
      <table class={tableClass}>
        <thead>
          <tr>
            <th>漢字</th>
            <th>回答</th>
            <th>漢字</th>
            <th>回答</th>
            <th>漢字</th>
            <th>回答</th>
          </tr>
        </thead>
        <tbody>
          {oldProvinces
            .reduce((acc, curr, index) => {
              if (index % 3 === 0) acc.push([]);
              acc[acc.length - 1].push(curr);
              return acc;
            }, [] as OldProvince[][])
            .map((group) => (
              <tr>
                {group.map((province) => (
                  <>
                    <td>{province.kanji}</td>
                    <td>{answers[province.kanji]}</td>
                  </>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <h2>SNSにシェア</h2>
      <div class={css`display: flex; flex-direction: column; gap: 1rem`}>
        <TwitterShareButton text={postText} />
        <input type="text" value={`${postText} #旧国名読みテスト`} />
        <button
          type="button"
          onClick={() =>
            navigator.clipboard
              .writeText(`${postText} #旧国名読みテスト`)
              .then(() => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
              })
          }
        >
          本文をコピー
        </button>
        {copySuccess && <div>テキストをコピーしました</div>}
      </div>
    </div>
  );
};

export default function OldProvinceQuiz() {
  const [isAnswering, setIsAnswering] = useState<boolean>(true);
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (kanji: string, reading: string) => {
    setAnswers((prev) => ({ ...prev, [kanji]: reading }));
  };

  return (
    <div>
      {oldProvinces.map((oldProvince, i) => (
        <AnswerField
          index={i}
          oldProvince={oldProvince}
          isAnswering={isAnswering}
          onAnswerChange={handleAnswerChange}
        />
      ))}
      <button type="button" onClick={() => setIsAnswering(false)}>
        回答終了
      </button>
      <button type="button" onClick={() => setIsAnswering(true)}>
        回答状態に戻す
      </button>
      {!isAnswering && <Answer answers={answers} />}
    </div>
  );
}

const tableClass = css`
  width: 100%;
  border-collapse: collapse;
  border: 2px solid rgb(140 140 140);
  font-size: 0.8rem;
  letter-spacing: 1px;

  thead {
    background-color: rgb(228 240 245);
  }

  th,
  td {
    border: 1px solid rgb(160 160 160);
    padding: 8px 10px;
  }

  tbody > tr:nth-of-type(even) {
    background-color: rgb(237 238 242);
  }
`;
