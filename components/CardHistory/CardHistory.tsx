import { FunctionComponent } from "react";

import Card from "../Card/Card";
import { smallCardStyles } from "../Card/Card.module.css";
import {
  cardContainerScrollStyles,
  cardContainerStyles,
  historyStyles,
  historyTitleStyles,
} from "./CardHistory.module.css";

interface CardHistoryProps {
  cardHistory: string[];
}

const CardHistory: FunctionComponent<CardHistoryProps> = ({ cardHistory }) => {
  return (
    <div className={historyStyles}>
      <div className={historyTitleStyles}>previous cards</div>
      <div className={cardContainerStyles}>
        <div className={cardContainerScrollStyles}>
          {cardHistory.map((qn) => (
            <Card styleName={smallCardStyles} question={qn} key={qn+"history"} contentTagsOn={false}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardHistory;
