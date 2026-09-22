import { MinecraftServerStatus, Player } from "../types";
import { useEffect, useRef, useState } from "react";

export function useServerStatus(
  url: string,
): MinecraftServerStatus | undefined {
  const [version, setVersion] = useState<string>("");
  const [online, setOnline] = useState<boolean | undefined>(undefined);
  const [players, setPlayers] = useState<Player[]>([]);
  const [allowlist, setAllowlist] = useState<Player[]>([]);
  const [useAllowlist, setUseAllowlist] = useState<boolean>(false);
  const [motd, setMOTD] = useState<string>("");
  const [maxPlayers, setMaxPlayers] = useState<number>(0);
  const [ws, setWS] = useState<WebSocket | undefined>();

  const stopLoadingTimeout = useRef<number>(undefined);

  useEffect(() => {
    const client = new WebSocket(url);
    setWS(client);

    const timeoutID = setTimeout(() => {
      setOnline(false);
    }, 6000);
    stopLoadingTimeout.current = timeoutID;

    return () => {
      clearTimeout(timeoutID);
    };
  }, [url]);

  useEffect(() => {
    if (ws === undefined) {
      return;
    }

    ws.onopen = (msg) => {
      console.log(msg);
      console.log("Clearing timeout", stopLoadingTimeout.current);
      clearTimeout(stopLoadingTimeout.current);
    };

    ws.onmessage = (msg) => {
      console.log(msg);
      const parsed = JSON.parse(msg.data);
      console.log(parsed);
      const messageType: string = parsed.type!;
      if (messageType === "init") {
        console.log("init");
        const msgOnline: boolean = parsed.data.online!;
        const msgPlayers: Player[] = parsed.data.players!;
        const msgVersion: string = parsed.data.version!;
        const msgMOTD: string = parsed.motd!;
        const msgMaxPlayers: number = parsed.max_players!;
        const msgAllowlist: Player[] = parsed.data.allowlist!;
        const msgUseAllowlist: boolean = parsed.data.usingAllowlist!;
        setOnline(msgOnline);
        setVersion(msgVersion);
        setPlayers(msgPlayers);
        setMOTD(msgMOTD);
        setMaxPlayers(msgMaxPlayers);
        setAllowlist(msgAllowlist);
        setUseAllowlist(msgUseAllowlist);
      }

      if (messageType === "playerJoined") {
        console.log("playerJoined");
        const msgPlayers: Player[] = parsed.data!;
        setPlayers((players) => {
          return [...players, ...msgPlayers];
        });
      }

      if (messageType === "playerLeft") {
        console.log("playerLeft");
        const msgPlayers: Player[] = parsed.data!;
        const msgPlayerIDs = msgPlayers.map((msgPlayer) => msgPlayer.id);
        setPlayers((players) =>
          players.filter((player) => !msgPlayerIDs.includes(player.id)),
        );
      }

      const msgMOTD: string = parsed.motd!;
      setMOTD(msgMOTD);
      const msgMaxPlayers: number = parsed.max_players!;
      setMaxPlayers(msgMaxPlayers);
      const msgOnline: boolean = parsed.online!;
      setOnline(msgOnline);
      const msgPlayers: Player[] = parsed.players!;
      setPlayers(msgPlayers);
      const msgIsAllowlistEnforced: boolean = parsed.is_allowlist_enforced!;
      setUseAllowlist(msgIsAllowlistEnforced);
      const msgAllowlist: Player[] = parsed.allowlist!;
      setAllowlist(msgAllowlist);
    };
  }, [ws]);

  console.log(players, version, motd);

  return {
    online,
    players,
    version,
    motd,
    maxPlayers,
    allowlist,
    useAllowlist,
  };
}
