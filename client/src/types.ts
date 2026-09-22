export interface Player {
  name: string;
  id: string;
}

export interface ServerPlayersData {
  online: number;
  max: number;
  list?: Player[]; // Only exists when online === 0
}

export interface OnlineServerStatus {
  online: true;
  version: string;
  players: Player[];
  // icon?: string;
  motd: string;
  maxPlayers: number;
  allowlist: Player[];
  useAllowlist: boolean;
}

export interface OfflineServerStatus {
  online: false;
}

export interface LoadingServerStatus {
  online: undefined;
}

export type MinecraftServerStatus =
  | OnlineServerStatus
  | OfflineServerStatus
  | LoadingServerStatus;

// Whitelist
type WhitelistedPlayer = Player;
export type Whitelist = WhitelistedPlayer[];
export interface WhitelistResponse extends Response {
  data: Whitelist;
}
