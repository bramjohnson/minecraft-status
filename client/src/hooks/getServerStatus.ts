// import { WebSocket } from "ws"
import { MCServerStatusData, PlayerData } from "../types";
import { useEffect, useState } from "react";

// export function connectToMinecraftWebSocket(url: string) {
//     const client = new WebSocket(url)
//     client.onopen((ws, msg: any) => {
//         console.log(msg);
//     })
// }

export function useServerStatus(url: string): MCServerStatusData | undefined {
  const [version, setVersion] = useState<string>("");
  const [online, setOnline] = useState<boolean>(false);
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [motd, setMOTD] = useState<string>("");
  const [ws, setWS] = useState<WebSocket | undefined>();

  useEffect(() => {
    const client = new WebSocket(url);
    setWS(client);
  }, [url]);

  useEffect(() => {
    if (ws === undefined) {
      return;
    }

    ws.onopen = (msg) => {
      console.log(msg);
    };

    ws.onmessage = (msg) => {
      console.log(msg);
      const parsed = JSON.parse(msg.data);
      console.log(parsed);
      const messageType: string = parsed.type!;
      if (messageType === "init") {
        console.log("init");
        const msgOnline: boolean = parsed.data.online!;
        const msgPlayers: PlayerData[] = parsed.data.players!;
        const msgVersion: string = parsed.data.version!;
        const msgMOTD: string = parsed.data.motd!;
        setOnline(msgOnline);
        setVersion(msgVersion);
        setPlayers(msgPlayers);
        setMOTD(msgMOTD);
      }

      if (messageType === "playerJoined") {
        console.log("playerJoined");
        const msgPlayers: PlayerData[] = parsed.data!;
        setPlayers((players) => {
          return [...players, ...msgPlayers];
        });
      }

      if (messageType === "playerLeft") {
        console.log("playerLeft");
        const msgPlayers: PlayerData[] = parsed.data!;
        const msgPlayerIDs = msgPlayers.map((msgPlayer) => msgPlayer.id);
        setPlayers((players) =>
          players.filter((player) => !msgPlayerIDs.includes(player.id)),
        );
      }
    };
  }, [ws]);

  console.log(players, version, motd);

  return { online, players, version, motd };
}
