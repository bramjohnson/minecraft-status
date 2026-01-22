import PlayerEntry from "./PlayerEntry";
import { OnlineData, PlayerData } from "../types";
import WhitelistChecker from "../whitelist/WhitelistChecker";

const getPlayersList = (playersData: PlayerData[]) => {
  return playersData.map((playerData: PlayerData, idx: number) => (
    <PlayerEntry key={idx} playerData={playerData} />
  ));
};

const OnlineStatus = ({ onlineData }: { onlineData: OnlineData }) => {
  // Change the website icon to the minecraft server icon
  // if (onlineData.icon) {
  //     document.getElementById('favicon')?.setAttribute('href', onlineData.icon);
  // }

  console.log(onlineData);

  const playerList = getPlayersList(onlineData.players);
  const onlinePlayerCount = onlineData.players.length;

  document.title = `${onlinePlayerCount}/${onlineData.maxPlayers} - Minecraft Server Status`;

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
