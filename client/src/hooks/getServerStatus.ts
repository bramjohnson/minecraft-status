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
    const [online, setOnline] = useState<boolean>(false);
    const [players, setPlayers] = useState<PlayerData[]>([]);
    const [ws, setWS] = useState<WebSocket | undefined>();

    useEffect(() => {
        const client = new WebSocket(url);
        setWS(client)
    }, [])

    useEffect(() => {
        if (ws === undefined) {
            return;
        }

        ws.onopen = (msg: any) => {
            console.log(msg);
        }

        ws.onmessage = (msg: any) => {
            console.log(msg)
            const parsed = JSON.parse(msg.data);
            console.log(parsed)
            const messageType: string = parsed.type!;
            if (messageType === "init") {
                console.log("init")
                const msgOnline: boolean = parsed.data.online!;
                const msgPlayers: PlayerData[] = parsed.data.players!;
                setOnline(msgOnline)
                setPlayers(msgPlayers)
            }

            if (messageType === "playersJoined") {
                console.log("playersJoined")
                const msgPlayers: PlayerData[] = parsed.data.players!;
                setPlayers(msgPlayers)
            }
        }
    }, [ws])


    return { online, players }
}