import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Form from "./Form";
import Result from "./Result";

function App() {
  const [isShortened, setIsShortened] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [shortenedUrl, setShortenedUrl] = React.useState("");

  return (
    <div>
      <Header />
      {!isShortened ? (
        <Form
          setUrl={setUrl}
          setShortenedUrl={setShortenedUrl}
          setIsShortened={setIsShortened}
        />
      ) : (
        <Result
          url={url}
          shortenedUrl={shortenedUrl}
          setIsShortened={setIsShortened}
          setUrl={setUrl}
          setShortenedUrl={setShortenedUrl}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
