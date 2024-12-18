export interface PlayerData {
  name: string;
  uuid: string;
}

interface StatusData {
  hostname: string;
  ip: string;
}

export interface ServerPlayersData {
  online: number;
  max: number;
  list?: PlayerData[]; // Only exists when online === 0
}

export interface OnlineData extends StatusData {
  online: true;
  version: string;
  players: ServerPlayersData;
  icon?: string;
  motd: {
    clean: string[];
  }
}

export interface OfflineData extends StatusData {
  'online': false;
}

export type MCServerStatusData = OnlineData | OfflineData;
export interface MCServerStatusResponse extends Response {
  data: MCServerStatusData,
}

// Whitelist 
type WhitelistedPlayer = PlayerData;
export type Whitelist = WhitelistedPlayer[];
export interface WhitelistResponse extends Response {
  data: Whitelist,
}