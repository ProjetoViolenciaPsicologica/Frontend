import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <link rel="icon" href="/icon.svg" />
        <title>Questionário Kurt Mendonça</title>
        <meta name="description" content="Questionário Kurt Mendonça" />
      </Head>
      <body className="h-screen bg-[#F6FBF9]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
