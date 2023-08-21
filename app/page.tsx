'use client'
import clsx from "clsx";
import { useEffect, useState } from "react";
import { scaleDown as Menu, Styles } from "react-burger-menu";

import { levelFour, levelOne, levelThree, levelTwo } from "@/shytl-data/levels";
import Card from "@/components/Card/Card";
import { bigCardStyles } from "@/components/Card/Card.module.css";
import Credits from "@/components/Credits/Credits";
import CardHistory from "@/components/CardHistory/CardHistory";
import logo from "@/public/images/techlifegame.png";

import {
  appStyles,
  levelButtonStyles,
  nextCardButtonStlyes,
  questionStyles,
  selectedLevelStyles,
  titleStyles,
  textInputStyles,
  smallButtonStyles,
  alignCenter
} from "@/public/styles/app.css";

function shuffle<T>(array: T[]) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const styles : any = {
  bmBurgerButton: {
    position: 'fixed',
    width: '3%',
    height: '3%',
    right: 10,
    top: 15,
  },
  bmBurgerBars: {
    background: '#40916b',
  },
  bmMenu: {
    background: 'white',
    padding: '10%',
    overflow: 'hidden'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  'page-wrap': {
    width: '100%',
    height: '100%',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    padding: 0,
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
};

const finalCardForLevelMessage = "You have finished all the cards in this level!";
const finalCardForGameMessage = "You've finished all the cards!  The game's done!  Refresh the page or update the player config to start over.";

function Home() {
  const levels = {
    levelOne: shuffle(levelOne),
    levelTwo: shuffle(levelTwo),
    levelThree: shuffle(levelThree),
    levelFour: shuffle(levelFour)
  };

  const levelKeyToInt = {
    levelOne: 1,
    levelTwo: 2,
    levelThree: 3,
    levelFour: 4
  };

  const [gameState, setGameState] = useState(levels);

  const [currLevel, setCurrLevel] = useState(Object.keys(levels)[0] as keyof typeof levels);
  const [currRound, setCurrRound] = useState(1);
  const [currCard, setCurrCard] = useState(levels[currLevel][0]);
  const [cardHistory, setCardHistory] = useState<any[]>([]);

  const [players, setPlayers] = useState<string[]>([]);
  const [rounds, setRounds] = useState(1);
  const [newPlayer, setNewPlayer] = useState("");
  const [playersThisRound, setPlayersThisRound] = useState<string[]>([]);
  const [roundStarted, setRoundStarted] = useState(false);

  const [contentTagsOn, setContentTagsOn] = useState(true);

  if (players.length > 1 && playersThisRound.length != players.length*2 && !roundStarted) {
    setPlayersThisRound(createPairs());
  }

  function createPairs() {
    let playersOrder = shuffle(players);
    let retPairs = new Array(playersOrder.length);
    for (let i = 0; i < playersOrder.length; i++) {
      retPairs[2*i + 1] = playersOrder[i];
    }

    let insertedMatch = 0;
    let currIdx = 0;

    while (insertedMatch < players.length) {
      let match = playersOrder[Math.floor(Math.random() * players.length)]
      if (match != retPairs[currIdx+1]) {
        retPairs[currIdx] = match;
        currIdx += 2;
        match = playersOrder[Math.floor(Math.random() * players.length)]
        insertedMatch++;
      }
    }

    return retPairs;
  }

  type levelKey = keyof typeof levels;

  function handleChangeLevel(newLevel: levelKey) {
    setCurrLevel(newLevel);
    if (gameState[newLevel].length === 1) {
      // setCurrCard(finalCardForLevelMessage); DEAL WITH THIS LATER
    } else {
      setCurrCard(gameState[newLevel][0]);
    }
  }

  const buttons = (Object.keys(levels) as levelKey[]).map((level) => (
    <button
      className={clsx(levelButtonStyles, { [selectedLevelStyles]: level === currLevel })}
      onClick={() => {handleChangeLevel(level); setCurrRound(1)}}
      key={level}
    >
      {level.split(/(?=[A-Z])/).join(" ")}
    </button>
  ));

  function handleNextCard(skip=false) {
    const finalCardForLevelMessage = "You have finished all the cards in this level!";
    if (gameState[currLevel].length === 1) {
      if (currCard.text === finalCardForLevelMessage) {
        return;
      } else {
        const tempHistory = [currCard, ...cardHistory];
        setCardHistory(tempHistory);
        // setCurrCard(finalCardForLevelMessage);
      }
    } else {
      if (!skip) {
        const tempHistory = [currCard, ...cardHistory];
        setCardHistory(tempHistory);
      }

      let tempGameStateLevel = gameState[currLevel].slice(1);
      setGameState({...gameState, [currLevel]: tempGameStateLevel});
      setCurrCard(gameState[currLevel][0]);
    }

    if (!skip) {  
      let updatedPlayersThisRound = [];
  
      if (players.length == 3) {
        updatedPlayersThisRound = playersThisRound.slice(3);
      } else {
        updatedPlayersThisRound = playersThisRound.slice(2);
      }
      setPlayersThisRound(updatedPlayersThisRound);
      
      if (updatedPlayersThisRound.length >= 2) { // if there's still players to go through in the queue
        setRoundStarted(true);
      } else { // if there's no more players, we should go to the next level, or the game may be over
        setRoundStarted(false);
        setCurrRound(currRound + 1);
        // if we exceed the number of rounds the player has set and there are still levels to go,
        // then let's go to the next level
        if (currRound+1 > rounds && levelKeyToInt[currLevel]+1 <= Object.keys(levelKeyToInt).length) {
          let keys = Object.keys(levelKeyToInt)
          let nextIndex = keys.indexOf(currLevel) + 1;
          handleChangeLevel(keys[nextIndex] as keyof typeof levels);
          setCurrRound(1);
        } // if this is the last level, end the game
        else if (currRound+1 > rounds && levelKeyToInt[currLevel]+1 > Object.keys(levelKeyToInt).length) {
          // setCurrCard(finalCardForGameMessage);
          setPlayers([]);
        }
      }
    }
  }

  const displayPlayerOrder = () => {
    let bullets = [];
    for (let i = 0; i < playersThisRound.length; i += 2) {
      bullets.push(playersThisRound.slice(i, i+2));
    }
    return <ol>{bullets.map((pair) => <li key={pair[0]+pair[1]}>{pair[0]} asks {pair[1]}</li>)}</ol>;
  }

  const handleAddPlayer = () => {
    if (newPlayer.length > 0) {
      setPlayers(current => [...current, newPlayer]);
      setNewPlayer('');
    }
  };

  const handleRemovePlayer = (e: React.ChangeEvent<any>) => {
    console.log(e.currentTarget.value);
    let toFilter = e.currentTarget.value;
    setPlayers(current => current.filter((v) => v !== toFilter));
  }

  const toggleContentTags = () => {
    setContentTagsOn(!contentTagsOn);
  };

  let renderedNames = players.map(player => <div key={player}>{player} &nbsp; <button value={player} onClick={handleRemovePlayer} className={clsx(smallButtonStyles)}>Remove</button></div>);

  return (
    <div id="outer-container" style={{height: '100%'}}>
      <Menu
        id="scaleDown"
        styles={styles}
        width={500}
        pageWrapId={ "page-wrap" }
        outerContainerId={ "outer-container" }
        right>
        <div className="alignLeft">
          <h2>Player Config</h2>
          <p><b>{players.length == 1 ? players.length + " player is " : players.length + " players are "}</b> playing with roughly {rounds == 1 ? rounds + " card " : rounds + " cards "}for each player each round, making a total of {players.length * rounds} cards each level.</p>
          <ul><h3>{renderedNames}</h3></ul>
          <input 
            value={newPlayer} 
            onChange={(e) => setNewPlayer(e.target.value)} 
            onKeyDown={(e) => { if (e.key === "Enter") handleAddPlayer() }} 
            className={clsx(textInputStyles)} />
          <br />
          <button onClick={handleAddPlayer} className={clsx(smallButtonStyles)}>Add player</button>
          <p>
            <input
              value={rounds}
              type="number"
              min="1"
              onChange={(e) => setRounds(parseInt(e.currentTarget.value))}
              className={clsx(textInputStyles)} />
            <br/>
            cards each player answers
          </p>
          <p><input type="checkbox" onClick={toggleContentTags} defaultChecked/> Play with content tags</p>
        </div>
      </Menu>
      <main id="page-wrap">
        <Credits />
        <div className={clsx(titleStyles, alignCenter)}><img src={logo.src} height={200}/><br/><b>so how&apos;s your tech life</b></div>
        <div className={appStyles}>
          <div>{buttons }</div>
          <div className={questionStyles}>
            <Card key={currCard.text} styleName={bigCardStyles} question={currCard.text} contentTagsOn={contentTagsOn}/>
          </div>
          <CardHistory cardHistory={cardHistory} />

          <div className={alignCenter}>
            {playersThisRound.length >= 2 ? <div>
              <button className={nextCardButtonStlyes} onClick={() => handleNextCard()}>
                next card
              </button>
              <button className={nextCardButtonStlyes} onClick={() => handleNextCard(true)}>
                skip card
              </button>
            </div> : ""}
            <div>
              <h3>Level {levelKeyToInt[currLevel]}, Round {currRound}, Card {players.length - (playersThisRound.length / 2) + 1}</h3>
              { (playersThisRound.length < 2 && levelKeyToInt[currLevel] == 1) && 
                  <div>Please add some players to begin!</div>
              }
              { (playersThisRound.length >= 2) &&
                  (<div>
                    <div>
                      <h3>Turn: { playersThisRound.length % 2 == 0 ? playersThisRound[0] + " asks " + playersThisRound[1] : playersThisRound[0] + ", " + playersThisRound[1] + " and " + playersThisRound[2] }</h3>
                    </div>
                    <div>
                      {displayPlayerOrder()}
                    </div>
                  </div>)
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;


// import Image from 'next/image'

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           Get started by editing&nbsp;
//           <code className="font-mono font-bold">app/page.tsx</code>
//         </p>
//         <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
//           <a
//             className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{' '}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className="dark:invert"
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
//         <Image
//           className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Docs{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Find in-depth information about Next.js features and API.
//           </p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Learn{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Learn about Next.js in an interactive course with&nbsp;quizzes!
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Templates{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Explore the Next.js 13 playground.
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Deploy{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   )
// }
