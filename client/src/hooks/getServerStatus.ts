import { useEffect, useState } from "react";
import { MCServerStatusData } from "../types";
import axios from "axios";

// Remote data is cached for 1 minute,
// Makes no sense to fetch again before cache is released.
const FETCH_INTERVAL_MILLIS = 60e3;

const fetchServerData = async (serverIP: string, callback: (data: any) => void): Promise<void> => {
    const res = await axios.get(`https://api.mcsrvstat.us/3/${serverIP}`);
    return callback(res.data);
}

export const useServerStatus = (serverIP: string): MCServerStatusData | undefined => {
    const [status, setStatus] = useState<MCServerStatusData>();
    const fetchServerDataThunk = () => { fetchServerData(serverIP, setStatus) };

    // Fetch data as soon as component is rendered
    useEffect(fetchServerDataThunk, []);

    // Fetch data every FETCH_INTERVAL_MILLIS ms
    useEffect(() => {
        const interval = setInterval(fetchServerDataThunk, FETCH_INTERVAL_MILLIS)

        // Clear the interval on cleanup
        return () => clearInterval(interval);
    }, []);

    return status;
}