
import { PlayerData } from '../types';

function PlayerEntry({ playerData }: { playerData: PlayerData }) {
    return (
        <div className='playerEntry'>
            <img className='playerAvatar' src={`https://mc-heads.net/avatar/${playerData.uuid}/64`} />
            <span className='playerUsername'>{playerData.name}</span>
        </div>
    )
}

export default PlayerEntry

