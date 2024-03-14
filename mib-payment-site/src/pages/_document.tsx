import {Html, Head, Main, NextScript} from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Make It Bilingual</title>
        <meta
          name="description"
          content="Make it Bilingual"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <body style={{margin: 0}}>
        <main>
          <Main />
        </main>
        <NextScript />
      </body>
    </Html>
  )
}
