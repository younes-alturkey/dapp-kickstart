import "semantic-ui-css/semantic.min.css";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  return <Component {...pageProps} />;
}
