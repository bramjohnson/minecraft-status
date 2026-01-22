import { useState } from "react";
import { PlayerData } from "../types";

const getWhitelistedSymbol = (username: string, isWhitelisted: boolean) => {
  if (!username || username === "") {
    return "help";
  } else if (isWhitelisted) {
    return "verified";
  } else {
    return "block";
  }
};

function WhitelistChecker({ whitelist }: { whitelist: PlayerData[] }) {
  const [usernameInput, setUsernameInput] = useState<string>("");

  const isUsernameWhitelisted = whitelist
    .map((whitelistPlayer) => whitelistPlayer.name)
    .includes(usernameInput);

  const whitelistedSymbol = getWhitelistedSymbol(
    usernameInput,
    isUsernameWhitelisted,
  );

  return (
    <div id="whitelist">
      <div id="whitelist-check">
        <span id="whitelist-label">Am I Whitelisted?</span>
        <input
          type="text"
          id="whitelist_username"
          placeholder="MyUsername"
          onInput={(event) => setUsernameInput(event.currentTarget.value)}
        />
        <span id="is-whitelisted-symbol" className="material-icons">
          {whitelistedSymbol}
        </span>
      </div>
    </div>
  );
}

export default WhitelistChecker;
