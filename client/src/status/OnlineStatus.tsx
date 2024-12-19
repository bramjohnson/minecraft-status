
import PlayerEntry from './PlayerEntry';
import { OnlineData, PlayerData, ServerPlayersData } from '../types';

const getPlayersList = (playersData: ServerPlayersData) => {
    if (playersData.list) {
        return playersData.list.map((playerData: PlayerData, idx: number) => <PlayerEntry key={idx} playerData={playerData} />)
    } else {
        return <></>
    }
}

const OnlineStatus = ({ onlineData }: { onlineData: OnlineData }) => {
    // Change the website icon to the minecraft server icon
    if (onlineData.icon) {
        document.getElementById('favicon')?.setAttribute('href', onlineData.icon);
    }

    document.title = `${onlineData.players.online}/${onlineData.players.max} - Minecraft Server Status`;

    const playerList = getPlayersList(onlineData.players);

    return (
        <>
            <div id="status-dashboard">
                <div id="status-header">
                    <div id="online-status">
                        <span id="online-status-icon" className="material-icons">track_changes</span>
                        <h2 id="online-status-text">Online</h2>
                        <span>{onlineData.version}</span>
                    </div>
                    <span id='online-status-motd'><i>{onlineData.motd.clean}</i></span>
                    <h2>Players: {onlineData.players.online}/{onlineData.players.max}</h2>
                </div>
            </div>

            {playerList}
        </>
    )
}

export default OnlineStatus

