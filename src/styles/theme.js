import { createMuiTheme } from "@material-ui/core";

// Creates a Theme for MUI accessible by entire App
// TODO: replace color patterns
const theme = createMuiTheme({
  palette: {
    primary: { main: "#437cca", hover: "#4e97c6" },
    secondary: { main: "#6D6E70", hover: "#4B5157" },
    default: { main: "#E6E6E6", hover: "#676767" },
    blueSky: { main: "#29AAE2" },
    risingSun: { main: "#F79520" },
    vastField: { main: "#1FDB74" },
    danger: { main: "#EE164A" },
    nightSky: { main: "#29AAE2" },
    moonWalk: { main: "#2D2D2D" },
    motherEarth: { main: "6D6E70" },
    white: { main: "#FFF" },
    whiteMarble: { main: "#E6E6E6" },
    soLight: { main: "#EEE" },
    background: {
      dark: "linear-gradient(216.33deg, #29323C 12.92%, #484863 96.82%)",
      default: "white",
      secondary: "rgb(238,238,238)"
    }
  }
});

export default theme;
