import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="AI Travel Assistant, Cheap flight deals, Cheap hotel deals" />
        <link rel="icon" href="assets/img/travelpally-icon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />


        <Script src="assets/js/vendor/jquery-3.6.0.min.js" strategy="beforeInteractive" />
        <Script src="assets/js/bootstrap.min.js" strategy="beforeInteractive" />
        <Script src="assets/js/jquery-ui.min.js" strategy="beforeInteractive" />
      </body>
    </Html>
  )
}
