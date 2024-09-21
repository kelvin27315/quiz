import { createRoute } from "honox/factory";
import { oldProvinces } from "../data/data";
import OldProvinceQuiz from "../islands/oldProvinceQuiz";

export default createRoute((c) => {
  return c.render(
    <div>
      <h1>旧国名読みテスト</h1>
      <p>
        次の漢字の読みをひらがなで記入しなさい。（全{oldProvinces.length}問）
      </p>
      <OldProvinceQuiz />
    </div>,
  );
});
