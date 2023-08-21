import { createVar, globalStyle } from "@vanilla-extract/css";

export const primaryAccent = createVar();
export const primaryAccentMuted = createVar();

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("html, body, #root", {
  height: "100%",
});

globalStyle("body", {
  fontFamily: '"Trebuchet MS", sans-serif',
  vars: {
    [primaryAccent]: "#40916b",
    [primaryAccentMuted]: "#2b7050",
  },
  color: primaryAccent
});

globalStyle("a, a:visited, a:hover", {
  margin: 0,
});

// Scrollbar stuff
globalStyle("::-webkit-scrollbar", {
  width: 5
});

globalStyle("::-webkit-scrollbar-track", {
  background: "none",
});

globalStyle("::-webkit-scrollbar-thumb", {
  background: primaryAccent,
  borderRadius: 50,
});
