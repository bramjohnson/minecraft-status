import { useRelativeTime } from "../hooks/useRelativeTime";
import { PlayerGhost } from "../types";

function PlayerGhostEntry({ ghostData }: { ghostData: PlayerGhost }) {
  const lastOnlineAgo = useRelativeTime(ghostData.last_online);
  return (
    <div className="playerGhostEntry">
      <img
        className="playerAvatar"
        src={`https://mc-heads.net/avatar/${ghostData.id}/64`}
      />
      <span className="playerUsername">{ghostData.name}</span>
      <span className="playerLastOnline">{lastOnlineAgo}</span>
    </div>
  );
}

export default PlayerGhostEntry;
