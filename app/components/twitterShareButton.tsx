import type { FC } from "hono/jsx";

export const TwitterShareButton: FC = ({ text }) => (
  <>
    <a
      href="https://twitter.com/share?ref_src=twsrc%5Etfw"
      class="twitter-share-button"
      data-text={text}
      data-hashtags="旧国名読みテスト"
      data-lang="ja"
      data-show-count="false"
    >
      Tweet
    </a>
    <script
      async
      src="https://platform.twitter.com/widgets.js"
      charset="utf-8"
    />
  </>
);
