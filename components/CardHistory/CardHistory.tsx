import { FunctionComponent } from "react";

import Card from "../Card/Card";
import { Card as CardData } from "@somatic/shytl-data/card";
import { smallCardStyles } from "../Card/Card.module.css";
import {
  cardContainerScrollStyles,
  cardContainerStyles,
  historyStyles,
  historyTitleStyles,
} from "./CardHistory.module.css";

interface CardHistoryProps {
  cardHistory: CardData[];
}

const CardHistory: FunctionComponent<CardHistoryProps> = ({ cardHistory }) => {
  return (
    <div className={historyStyles}>
      <div className={historyTitleStyles}>previous cards</div>
      <div className={cardContainerStyles}>
        <div className={cardContainerScrollStyles}>
          {cardHistory.map((c, i) => (
            <Card
              card={c}
              contentTagsOn={false}
              key={String(i) + "history"}
              styleName={smallCardStyles}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardHistory;
