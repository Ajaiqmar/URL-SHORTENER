import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

function Result(props) {
  const marginLength = window.screen.height / 16 / 4.5;

  const ModifiedTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white"
      },
      "&:hover fieldset": {
        borderColor: "white"
      },
      "&.Mui-focused fieldset": {
        borderColor: "white"
      }
    }
  });

  function copyShortenedURL() {
    var copyText = document.querySelector("#inputURL");

    copyText.select();
    copyText.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(copyText.value);
  }

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <ModifiedTextField
            fullWidth
            id="inputURL"
            autoComplete="off"
            value={props.shortenedUrl}
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
                color: "white",
                fontFamily: "'Fresca', sans-serif",
                fontSize: "2rem"
              }
            }}
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
      <div className="buttonGroup">
        <Button
          variant="contained"
          onClick={copyShortenedURL}
          sx={{
            fontSize: "1.5rem",
            color: "white",
            fontFamily: "'Fresca', sans-serif",
            backgroundColor: "rgba(255,255,255,0.3)",
            margin: "2rem 1rem"
          }}
        >
          COPY
        </Button>
        <Button
          variant="contained"
          onClick={refreshPage}
          sx={{
            fontSize: "1.5rem",
            color: "white",
            fontFamily: "'Fresca', sans-serif",
            backgroundColor: "rgba(255,255,255,0.3)",
            margin: "2rem 1rem"
          }}
        >
          BACK
        </Button>
      </div>
    </div>
  );
}

export default Result;
