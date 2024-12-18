import axios from "axios";
import { Whitelist, WhitelistResponse } from "../types";
import { useEffect, useState } from "react";

export const useWhitelist = (whitelistUrl: string): (username: string) => boolean => {
    const [whitelist, setWhitelist] = useState<Set<string>>();

    useEffect(() => {
        (async () => {
            if (whitelist === undefined) {
                const resWhitelist: WhitelistResponse = await axios.get(whitelistUrl);
                const whitelist: Whitelist = resWhitelist.data;

                const whitelistUsernames = whitelist.map((player) => player.name)
                setWhitelist(new Set(whitelistUsernames));
            }
        })();
    }, [])

    const isUsernameWhitelisted = (username: string) => {
        return whitelist !== undefined && whitelist.has(username.trim());
    }

    return isUsernameWhitelisted
}