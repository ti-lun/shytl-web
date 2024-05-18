import { style } from "@vanilla-extract/css";

import { primaryAccent } from "@/public/styles/globals.css";

export const cardStyles = style({
  color: primaryAccent,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  transition: "transform 0.1s ease-in-out",
  ":hover": {
    transform: "scale(1.02)",
  },
});

export const bigCardStyles = style({
  fontSize: 20,
  width: "100%",
  height: "15em",
  margin: "3rem",
  backgroundColor: "white",
  color: primaryAccent,
  borderRadius: 50,
  boxShadow: `
  0px 0.7px 2.1px rgba(0, 0, 0, 0.018),
  0px 1.6px 4.8px rgba(0, 0, 0, 0.026),
  0px 2.9px 8.7px rgba(0, 0, 0, 0.032),
  0px 4.8px 14.5px rgba(0, 0, 0, 0.038),
  0px 7.9px 23.8px rgba(0, 0, 0, 0.044),
  0px 13.9px 41.6px rgba(0, 0, 0, 0.052),
  0px 30px 90px rgba(0, 0, 0, 0.07)
  `,
  padding: "5rem",
});

export const smallCardStyles = style({
  // margin: "auto",
  fontSize: 12,
  width: "80%",
  height: "8rem",
  // marginTop: "",
  // marginBottom: "1vh",
  margin: "2rem",
  borderRadius: 30,
  boxShadow: `
  0px 0.7px 2.1px rgba(0, 0, 0, 0.018), 
  0px 1.6px 4.8px rgba(0, 0, 0, 0.026), 
  0px 2.9px 8.7px rgba(0, 0, 0, 0.032), 
  0px 4.8px 14.5px rgba(0, 0, 0, 0.038),
  0px 7.9px 23.8px rgba(0, 0, 0, 0.044),
  0px 13.9px 20px rgba(0, 0, 0, 0.052),
  0px 20px 20px rgba(0, 0, 0, 0.07)
  `,
  padding: 20,
});

export const red = style({
  backgroundColor: "#ffd7d1",
  color: "#fc5a42",
});

export const orange = style({
  backgroundColor: "#fff2e3",
  color: "#ff991c",
});

export const yellow = style({
  backgroundColor: "#ffffe3",
  color: "#b5b20b",
});

export const green = style({
  backgroundColor: "#edffe3",
});

export const blue = style({
  backgroundColor: "#e3faff",
  color: "#5ca5ff",
});
