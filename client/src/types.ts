export interface PlayerData {
  name: string;
  id: string;
}

// interface DebugData {
//   cachetime: number;
//   cacheexpire: number;
// }

interface StatusData {
  //   hostname: string;
  //   ip: string;
  //   debug: DebugData;
}

export interface ServerPlayersData {
  online: number;
  max: number;
  list?: PlayerData[]; // Only exists when online === 0
}

export interface OnlineData extends StatusData {
  online: true;
  version: string;
  players: PlayerData[];
  // icon?: string;
  motd: string;
  maxPlayers: number;
  allowlist: PlayerData[];
  useAllowlist: boolean;
}

export interface OfflineData extends StatusData {
  online: false;
}

export type MCServerStatusData = OnlineData | OfflineData;
export interface MCServerStatusResponse extends Response {
  data: MCServerStatusData;
}

// Whitelist
type WhitelistedPlayer = PlayerData;
export type Whitelist = WhitelistedPlayer[];
export interface WhitelistResponse extends Response {
  data: Whitelist;
}
