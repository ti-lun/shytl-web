import { style } from "@vanilla-extract/css";

import { primaryAccent, primaryAccentMuted } from "./globals.css";

export const appStyles = style({
  textAlign: "center",
  display: "flex",
  flexDirection: "row",
  alignContent: "center",
  alignItems: "center",
  fontWeight: 800,
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  maxWidth: 1080,
  margin: "0 auto",
  height: "100%",
});

export const titleStyles = style({
  color: primaryAccent,
  fontSize: 30,
  paddingTop: "3vh",
  paddingBottom: "3vh",
  fontWeight: 1600,
  fontFamily: "Consolas"
});

export const levelsStyles = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  width: "17rem",
});

export const levelButtonStyles = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textTransform: "uppercase",
  margin: 15,
  borderRadius: 15,
  border: `solid 2px ${primaryAccent}`,
  backgroundColor: "#fff",
  height: "6em",
  width: "15em",
  color: primaryAccent,
  fontSize: 15,
  fontWeight: 800,
  fontFamily: "inherit",
  cursor: "pointer",

  ":hover": {
    backgroundColor: primaryAccentMuted,
    color: "rgb(240, 240, 240)",
  },
  selectors: {
    "&:focus, &:active": {
      outline: "none",
    },
  },
});

export const selectedLevelStyles = style({
  backgroundColor: primaryAccent,
  color: "#fff",
  outline: "none",
});

export const nextCardButtonStlyes = style({
  alignItems: "center",
  justifyContent: "center",
  margin: 25,
  borderRadius: 15,
  backgroundColor: ["#fff", primaryAccent],
  height: 88,
  width: 231,
  textTransform: "uppercase",
  color: "#fff",
  outline: "none",
  fontSize: 18,
  fontWeight: 800,
  fontFamily: '"Biryani", sans-serif',
  border: "none",

  ":hover": {
    backgroundColor: primaryAccentMuted,
    color: "rgb(240, 240, 240)",
  },
});

export const questionStyles = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "26rem",
  alignItems: "center",
});

export const textInputStyles = style({
  border: `solid 2px ${primaryAccent}`,
  fontSize: "2em",
  color: primaryAccentMuted,
  fontFamily: "Consolas",
  borderRadius: 10,
  padding: 10
});

export const smallButtonStyles = style({
  alignItems: "center",
  justifyContent: "center",
  textTransform: "uppercase",
  marginTop: 5,
  borderRadius: 10,
  border: `solid 2px ${primaryAccent}`,
  backgroundColor: "#fff",
  height: "2em",
  width: "10em",
  color: primaryAccent,
  fontSize: 15,
  fontWeight: 800,
  fontFamily: "inherit",
  cursor: "pointer",

  ":hover": {
    backgroundColor: primaryAccentMuted,
    color: "rgb(240, 240, 240)",
  },
  selectors: {
    "&:focus, &:active": {
      outline: "none",
    },
  }
});

export const alignCenter = style({
  textAlign: "center"
});

export const alignLeft = style({
  textAlign: "left"
});