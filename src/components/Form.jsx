import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Axios from "axios";

function Form(props) {
  const marginLength = window.screen.height / 16 / 4.5;
  const [inputColor, setInputColor] = React.useState("white");

  const ModifiedTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: inputColor
      },
      "&:hover fieldset": {
        borderColor: inputColor
      },
      "&.Mui-focused fieldset": {
        borderColor: inputColor
      }
    }
  });

  function shortenURL() {
    try {
      const inputURL = document.querySelector("#inputURL").value;
      const url = new URL(inputURL);

      if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new Error();
      }

      Axios.post("https://shorten--url.herokuapp.com/compress", {
        inputURL: inputURL
      })
        .then(function (response) {
          response = response.data;

          props.setUrl(response.inputURL);
          props.setShortenedUrl(
            "https://shorten--url.herokuapp.com/" + response.shortenedURL
          );
          props.setIsShortened(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      setInputColor("red");
    }
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <ModifiedTextField
            fullWidth
            label="URL"
            id="inputURL"
            autoComplete="off"
            sx={{
              margin: marginLength + "rem 0rem 0rem 0rem"
            }}
            inputProps={{
              style: {
                color: "white",
                fontFamily: "'Fresca', sans-serif",
                fontSize: "2rem"
              }
            }}
            InputLabelProps={{
              style: {
                color: inputColor,
                fontFamily: "'Fresca', sans-serif",
                fontSize: "2rem"
              }
            }}
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
      <Button
        variant="contained"
        onClick={shortenURL}
        sx={{
          fontSize: "1.5rem",
          color: "white",
          fontFamily: "'Fresca', sans-serif",
          backgroundColor: "rgba(255,255,255,0.3)",
          display: "block",
          margin: "2rem auto"
        }}
      >
        GENERATE
      </Button>
    </div>
  );
}

export default Form;
