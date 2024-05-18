import clsx from "clsx";
import { FunctionComponent } from "react";
import { scaleDown as Menu } from "react-burger-menu";
import { User } from "@somatic/shytl-data/user";
import styles from "@/components/GameMenu/GameMenuStyles";

import { textInputStyles, smallButtonStyles } from "@/public/styles/app.css";

interface GameMenuProps {
  handleAddPlayer: Function;
  handleRemovePlayer: Function;
  newPlayer: string;
  platform: number;
  players: User[];
  rounds: number;
  setNewPlayer: Function;
  setRounds: Function;
  toggleContentTags: Function;
}

const GameMenu: FunctionComponent<GameMenuProps> = ({
  handleAddPlayer,
  handleRemovePlayer,
  newPlayer,
  platform,
  players,
  rounds,
  setNewPlayer,
  setRounds,
  toggleContentTags,
}) => {
  let renderedNames = players.map((player) => (
    <div key={player.name}>
      {player.name} &nbsp;
      <button
        value={player.id}
        onClick={() => handleRemovePlayer(player.id)}
        className={clsx(smallButtonStyles)}
      >
        Remove
      </button>
    </div>
  ));

  return (
    <Menu
      id="scaleDown"
      styles={styles}
      width={500}
      pageWrapId={"page-wrap"}
      outerContainerId={"outer-container"}
      right
    >
      <div className="alignLeft">
        <h2>Player Config</h2>
        <p>
          <b>
            {players.length == 1
              ? players.length + " player is "
              : players.length + " players are "}
          </b>{" "}
          playing with {rounds == 1 ? rounds + " card " : rounds + " cards "}for
          each player each round, making a total of {players.length * rounds}{" "}
          cards each level.
        </p>
        <ul>
          <h3>{renderedNames}</h3>
        </ul>
        <input
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddPlayer();
          }}
          className={clsx(textInputStyles)}
        />
        <br />
        <button
          onClick={() => handleAddPlayer()}
          className={clsx(smallButtonStyles)}
        >
          Add player
        </button>
        <p>
          <input
            value={rounds}
            type="number"
            min="1"
            onChange={(e) => setRounds(parseInt(e.currentTarget.value))}
            className={clsx(textInputStyles)}
          />
          <br />
          cards each player answers
        </p>
        <p>
          <input
            type="checkbox"
            onClick={() => toggleContentTags()}
            defaultChecked
          />{" "}
          Play with content tags
        </p>
      </div>
    </Menu>
  );
};

export default GameMenu;
