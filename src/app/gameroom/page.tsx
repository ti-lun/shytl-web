'use client'
import GameUI from "@/components/Game/GameUI";
// import clsx from "clsx";
import { useState } from "react";
// import { scaleDown as Menu, Styles } from "react-burger-menu";
// import Image from "next/image";
import * as UUID from "uuid";

// import Card from "@/components/Card/Card";
// import { bigCardStyles } from "@/components/Card/Card.module.css";
// import Credits from "@/components/Credits/Credits";
// import CardHistory from "@/components/CardHistory/CardHistory";
// import logo from "@/public/images/techlifegame.png";

// import { isError } from '@somatic/shytl-data/error';
import { Game, createGameFromId } from '@somatic/shytl-data/game';
// import { update, Event } from '@somatic/shytl-data/update';

// import {
//   appStyles,
//   levelButtonStyles,
//   nextCardButtonStyles,
//   questionStyles,
//   selectedLevelStyles,
//   titleStyles,
//   textInputStyles,
//   smallButtonStyles,
//   alignCenter
// } from "@/public/styles/app.css";

// import { FinalCard } from "@somatic/shytl-data/card";

// const styles : any = {
//   bmBurgerButton: {
//     position: 'fixed',
//     width: '3%',
//     height: '3%',
//     right: 10,
//     top: 15,
//   },
//   bmBurgerBars: {
//     background: '#40916b',
//   },
//   bmMenu: {
//     background: 'white',
//     padding: '10%',
//     overflow: 'hidden'
//   },
//   bmMenuWrap: {
//     position: 'fixed',
//     height: '100%'
//   },
//   bmCross: {
//     background: '#bdc3c7'
//   },
//   'page-wrap': {
//     width: '100%',
//     height: '100%',
//     display: 'flex',
//     'justify-content': 'center',
//     'align-items': 'center',
//     padding: 0,
//   },
//   bmOverlay: {
//     background: 'rgba(0, 0, 0, 0.3)'
//   }
// };

function Page() {
  return <GameUI newPlayer="" localGame={createGameFromId(UUID.v4())} platform={1} />
}

export default Page;