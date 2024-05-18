"use client";
import clsx from "clsx";
import { useState } from "react";
import { FunctionComponent } from "react";
import GameMenu from "@/components/GameMenu/GameMenu";
import Image from "next/image";
import * as UUID from "uuid";
import { Platforms } from "@/src/lib/enums";

import Card from "@/components/Card/Card";
import { bigCardStyles } from "@/components/Card/Card.module.css";
import Credits from "@/components/Credits/Credits";
import CardHistory from "@/components/CardHistory/CardHistory";
import logo from "@/public/images/techlifegame.png";

import { isError } from "@somatic/shytl-data/error";
import { Game, createGameFromId } from "@somatic/shytl-data/game";
import { update, Event } from "@somatic/shytl-data/update";

import {
  appStyles,
  levelButtonStyles,
  nextCardButtonStyles,
  questionStyles,
  selectedLevelStyles,
  titleStyles,
  alignCenter,
} from "@/public/styles/app.css";

import { FinalCard } from "@somatic/shytl-data/card";

interface GameUIProps {
  initialLocalGame: Game; 
  platform: Platforms // Platforms enum
}

const GameUI: FunctionComponent<GameUIProps> = ({ initialLocalGame, platform }) => {
  const [localGame, setLocalGame] = useState<Game>(initialLocalGame);
  const [newPlayer, setNewPlayer] = useState("");

  const players = localGame.players;
  const rounds = localGame.options.rounds;
  let currCard =
    localGame.currentCard === undefined ? FinalCard : localGame.currentCard;

  function updatelocalGame(event: Event) {
    if (platform == Platforms.online) {
      // send a request to start a new game--then we need to get the room ID to help people join
    }

    const newState = update(localGame, event);
    if (isError(newState)) alert(newState);
    else setLocalGame(newState);
  }

  // this is really just a thing that makes sense in local play
  // not a thing in online
  function handleAddPlayer() {
    if (newPlayer.length > 0)
      updatelocalGame({
        type: "Event",
        eventType: "AddPlayer",
        event: { player: { id: UUID.v4(), name: newPlayer } },
      });
  }

  function handleRemovePlayer(e: React.ChangeEvent<any>) {
    const playerID = e.currentTarget.value;
    updatelocalGame({
      type: "Event",
      eventType: "RemovePlayer",
      event: { playerID },
    });
  }

  function setRounds(r: number) {
    updatelocalGame({
      type: "Event",
      eventType: "UpdateOptions",
      event: { options: { ...localGame.options, rounds: r } },
    });
  }

  function toggleContentTags() {
    updatelocalGame({
      type: "Event",
      eventType: "UpdateOptions",
      event: {
        options: {
          ...localGame.options,
          contentTagsOn: !localGame.options.contentTagsOn,
        },
      },
    });
  }

  function jumpToLevel(level: number) {
    updatelocalGame({
      type: "Event",
      eventType: "JumpToLevel",
      event: { level },
    });
  }

  function handleNextCard(skip: boolean = false) {
    if (!skip) updatelocalGame({ type: "Event", eventType: "DrawCard" });
    else updatelocalGame({ type: "Event", eventType: "SkipCard" });
  }

  const buttons = [0, 1, 2, 3].map((level) => (
    <button
      className={clsx(levelButtonStyles, {
        [selectedLevelStyles]: level === localGame.currentLevel,
      })}
      onClick={() => {
        jumpToLevel(level);
      }}
      key={level + 1}
    >
      {"Level " + String(level + 1)}
    </button>
  ));

  return (
    <div id="outer-container" style={{ height: "100%" }}>
      <GameMenu
        handleAddPlayer={handleAddPlayer}
        handleRemovePlayer={handleRemovePlayer}
        newPlayer={newPlayer}
        platform={platform}
        players={players}
        rounds={rounds}
        setNewPlayer={setNewPlayer}
        setRounds={setRounds}
        toggleContentTags={toggleContentTags}
      />
      <main id="page-wrap">
        <Credits />
        <div className={clsx(titleStyles, alignCenter)}>
          <Image
            alt="a funny picture of Tommy Wiseau saying so how's your tech life"
            height={200}
            width={200}
            src={logo.src}
          />
          <br />
          <b>so how&apos;s your tech life</b>
        </div>
        <div className={appStyles}>
          <div>{buttons}</div>
          <div className={questionStyles}>
            {localGame.currentAsker != null &&
            localGame.currentAnswerer != null ? (
                <Card
                  key={
                    localGame.currentCard !== undefined
                      ? localGame.currentCard.text
                      : 0
                  }
                  styleName={bigCardStyles}
                  card={currCard}
                  contentTagsOn={localGame.options.contentTagsOn}
                />
              ) : (
                "Please add some players"
              )}
          </div>
          <CardHistory cardHistory={localGame.cardHistory} />

          <div className={alignCenter}>
            <div>
              <h3>
                Level {localGame.currentLevel + 1}, Round{" "}
                {localGame.currentRound + 1}
              </h3>
              {localGame.players.length < 2 && localGame.currentLevel == 1 && (
                <div>Please add some players to begin!</div>
              )}
            </div>
            {localGame.currentAsker !== null &&
            localGame.currentAnswerer !== null ? (
                <div>
                  <button
                    className={nextCardButtonStyles}
                    onClick={() => handleNextCard()}
                  >
                  next card
                  </button>
                  <button
                    className={nextCardButtonStyles}
                    onClick={() => handleNextCard(true)}
                  >
                  skip card
                  </button>
                </div>
              ) : (
                <button
                  className={nextCardButtonStyles}
                  onClick={() => handleNextCard(false)}
                >
                start game
                </button>
              )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GameUI;
