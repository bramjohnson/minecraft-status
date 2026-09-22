import PlayerEntry from "./PlayerEntry";
import { OnlineServerStatus, Player } from "../types";
import WhitelistChecker from "../whitelist/WhitelistChecker";

const getPlayersList = (playersData: Player[]) => {
  return playersData.map((playerData: Player, idx: number) => (
    <PlayerEntry key={idx} playerData={playerData} />
  ));
};

function updatePageTitle(playersOnline: number, playersMax: number) {
  document.title = `${playersOnline}/${playersMax} - Minecraft Server Status`;
}

const OnlineStatus = ({
  onlineData,
  serverIP,
}: {
  onlineData: OnlineServerStatus;
  serverIP: string;
}) => {
  // Change the website icon to the minecraft server icon
  if (onlineData) {
    document
      .getElementById("favicon")
      ?.setAttribute(
        "href",
        `https://eu.mc-api.net/v3/server/favicon/${serverIP}`,
      );
  }

  const playerList = getPlayersList(onlineData.players);
  const onlinePlayerCount = onlineData.players.length;

  updatePageTitle(onlinePlayerCount, onlineData.maxPlayers);

  const whitelistCheckerComponent = onlineData.useAllowlist ? (
    <WhitelistChecker whitelist={onlineData.allowlist} />
  ) : (
    <></>
  );

  return (
    <>
      {whitelistCheckerComponent}
      <div id="status-dashboard">
        <div id="status-header">
          <div id="online-status">
            <span id="online-status-icon" className="material-icons">
              track_changes
            </span>
            <h2 id="online-status-text">Online</h2>
            <span>{onlineData.version}</span>
          </div>
          <span id="online-status-motd">
            <i>{onlineData.motd}</i>
          </span>
          <h2>
            Players: {onlinePlayerCount}/{onlineData.maxPlayers}
          </h2>
        </div>
      </div>

      {playerList}
    </>
  );
};

export default OnlineStatus;
