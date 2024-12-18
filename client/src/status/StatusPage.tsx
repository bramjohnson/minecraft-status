
import { MCServerStatusData } from '../types';
import OfflineStatus from './OfflineStatus';
import OnlineStatus from './OnlineStatus';
import { useServerStatus } from '../hooks/getServerStatus';

function StatusPage({ serverIP }: { serverIP: string }) {
    const statusData: MCServerStatusData | undefined = useServerStatus(serverIP);

    // Don't show if no status found...
    if (statusData === undefined) {
        return <></>;
    }

    return statusData.online ? <OnlineStatus onlineData={statusData}/> : <OfflineStatus />
}

export default StatusPage

