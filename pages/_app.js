import "antd/dist/antd.css";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import "../styles/css_patient_add_recation.css";
import "../styles/css_patient_blood_reques_blooddetil.css";
import "../styles/css_patient_trans_blood.css";
import "../styles/globals.css";
import "../styles/Patent_blood_request_lab_new.css";
import "../styles/report.css";


const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sarabun:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <NextNProgress
        color="orange"
        startPosition={0.3}
        stopDelayMs={200}
        height={4}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
