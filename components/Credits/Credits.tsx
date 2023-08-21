import { contStyles, creditStyles, creditTitleStyles } from "./Credits.module.css";

const Credits = () => {
  return (
    <div className={creditStyles}>
      <div className={creditTitleStyles}>how & who</div>
      <div className={contStyles}>
        <h3>How to play:</h3>
        <p>Pop open the menu on the upper-right side and add your player(s).  You can play by yourself,... technically you&apos;re asking yourself questions.</p>
        <p>See the public github repo <a href="https://github.com/ti-lun/sohowsyourtechlife">here</a>, which contains a list of all the questions.  Open to feedback!</p>
        <p>Refresh to reset card decks.</p>
        <p>
          Made by Chloe [a website coming soon lol], forked from WNRS by <a href="https://github.com/munjoonteo">@munjoonteo</a> and{" "}
          <a href="https://github.com/ilyues">@ilyues</a>.
        </p>
      </div>
    </div>
  );
};

export default Credits;
