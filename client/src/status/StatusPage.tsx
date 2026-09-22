import { MinecraftServerStatus } from "../types";
import OfflineStatus from "./OfflineStatus";
import OnlineStatus from "./OnlineStatus";
import { useServerStatus } from "../hooks/useServerStatus";
import LoadingStatus from "./LoadingStatus";

function StatusPage({
  managementAPI,
  serverIP,
}: {
  managementAPI: string;
  serverIP: string;
}) {
  const statusData: MinecraftServerStatus | undefined =
    useServerStatus(managementAPI);

  console.log(statusData);

  // Don't show if no status found...
  if (statusData === undefined) {
    return <></>;
  }

  switch (statusData.online) {
    case true:
      return <OnlineStatus onlineData={statusData} serverIP={serverIP} />;
    case false:
      return <OfflineStatus />;
    case undefined:
      return <LoadingStatus />;
  }
}

export default StatusPage;
