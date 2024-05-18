"use client";
import GameUI from "@/components/Game/GameUI";
import * as UUID from "uuid";

import { Game, createGameFromId } from "@somatic/shytl-data/game";

function Page() {
  return (
    <GameUI initialLocalGame={createGameFromId(UUID.v4())} platform={1} />
  );
}

export default Page;
