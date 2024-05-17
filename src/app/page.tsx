'use client'
import clsx from "clsx";
import { useState } from "react";
import { scaleDown as Menu, Styles } from "react-burger-menu";
import Image from "next/image";
import * as UUID from "uuid";

import Card from "@/components/Card/Card";
import { bigCardStyles } from "@/components/Card/Card.module.css";
import Credits from "@/components/Credits/Credits";
import CardHistory from "@/components/CardHistory/CardHistory";
import logo from "@/public/images/techlifegame.png";

import { isError } from '@somatic/shytl-data/error';
import { Game, createGameFromId } from '@somatic/shytl-data/game';
import { update, Event } from '@somatic/shytl-data/update';

import {
  appStyles,
  levelButtonStyles,
  nextCardButtonStyles,
  questionStyles,
  selectedLevelStyles,
  titleStyles,
  textInputStyles,
  smallButtonStyles,
  alignCenter
} from "@/public/styles/app.css";

import { FinalCard } from "@somatic/shytl-data/card";

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

function Home() {
  const [ localGame, setLocalGame ] = useState<Game>(createGameFromId(UUID.v4()));
  const [newPlayer, setNewPlayer] = useState("");

  function updatelocalGame(event: Event) {
    const newState = update(localGame, event);
    if (isError(newState))
      alert(newState)
    else
      setLocalGame(newState);
  }

  function handleAddPlayer() {
    if (newPlayer.length > 0) 
      updatelocalGame({ type: "Event", eventType: "AddPlayer", event: { player: { id: UUID.v4(), name: newPlayer } } })
  }

  function handleRemovePlayer(e: React.ChangeEvent<any>) {
    const playerID = e.currentTarget.value;
    updatelocalGame({ type: "Event", eventType: "RemovePlayer", event: { playerID } });
  }

  function setRounds(r: number) { 
    updatelocalGame({ type: "Event", eventType: "UpdateOptions", event: { options: { ...localGame.options, rounds: r } } });
  }

  function toggleContentTags() {
    updatelocalGame({ type: "Event", eventType: "UpdateOptions", event: { options: { ...localGame.options, contentTagsOn: !localGame.options.contentTagsOn } } });
  }

  function jumpToLevel(level: number) {
    updatelocalGame({ type: "Event", eventType: "JumpToLevel", event: { level } } );
  }

  function handleNextCard(skip: boolean = false) {
    if (!skip)
      updatelocalGame({ type: "Event", eventType: "DrawCard" });
    else
      updatelocalGame({ type: "Event", eventType: "SkipCard" });
  }

  const players = localGame.players;
  const rounds = localGame.options.rounds;

  const buttons = [0, 1, 2, 3].map((level) => (
    <button
      className={clsx(levelButtonStyles, { [selectedLevelStyles]: level === localGame.currentLevel })}
      onClick={() => {jumpToLevel(level)}}
      key={level+1}
    >
      {"Level " + String(level+1)}
    </button>
  ));

  let renderedNames = players.map(player => <div key={player.name}>{player.name} &nbsp; <button value={player.id} onClick={handleRemovePlayer} className={clsx(smallButtonStyles)}>Remove</button></div>);

  let currCard = localGame.currentCard === undefined
  ? FinalCard
  : localGame.currentCard;

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
          <p><b>{players.length == 1 ? players.length + " player is " : players.length + " players are "}</b> playing with {rounds == 1 ? rounds + " card " : rounds + " cards "}for each player each round, making a total of {players.length * rounds} cards each level.</p>
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
        <div className={clsx(titleStyles, alignCenter)}>
          <Image 
            alt="a funny picture of Tommy Wiseau saying so how's your tech life"
            height={200}
            width={200}
            src={logo.src} />
          <br/>
          <b>so how&apos;s your tech life</b>
        </div>
        <div className={appStyles}>
          <div>{buttons }</div>
          <div className={questionStyles}>
            { localGame.currentAsker != null && localGame.currentAnswerer != null ?
                <Card 
                  key={localGame.currentCard !== undefined ? localGame.currentCard.text : 0}
                  styleName={bigCardStyles}
                  card={currCard}
                  contentTagsOn={localGame.options.contentTagsOn} /> :
                "Please add some players"
            }

          </div>
          <CardHistory cardHistory={localGame.cardHistory} />

          <div className={alignCenter}>
            <div>
                <h3>Level {localGame.currentLevel + 1}, Round {localGame.currentRound + 1}</h3>
                { (localGame.players.length < 2 && localGame.currentLevel == 1) && 
                    <div>Please add some players to begin!</div>
                }
              </div>
            {localGame.currentAsker !== null && localGame.currentAnswerer !== null ? <div>
              <button className={nextCardButtonStyles} onClick={() => handleNextCard()}>
                next card
              </button>
              <button className={nextCardButtonStyles} onClick={() => handleNextCard(true)}>
                skip card
              </button>
            </div> : <button className={nextCardButtonStyles} onClick={() => handleNextCard(false)}>start game</button>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;