"use client";
import GameUI from "@/components/Game/GameUI";
import { Platforms } from "@/src/lib/enums";
import * as UUID from "uuid";

import { createGameFromId } from "@somatic/shytl-data/game";

function Page() {
  return (
    <GameUI initialLocalGame={createGameFromId(UUID.v4())} platform={Platforms.local} />
  );
}

export default Page;
