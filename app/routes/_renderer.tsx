import { Style, css } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";
import { Script } from "honox/server";

export default jsxRenderer(({ children }) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>旧国名読みテスト</title>
        <Script src="/app/client.ts" async />
        <Style />
      </head>
      <body>
        <div class={containerClass}>{children}</div>
      </body>
    </html>
  );
});

const containerClass = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
`;
