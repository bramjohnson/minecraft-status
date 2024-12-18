# Minecraft Status
Displays your Minecraft server status as a single page application.

## Features
- IP copying
- Whitelist lookup
- Server status
- Players online

# Installation
1. Clone the repo
2. `npm i` in the [client](/client/) folder
3. Copy [.env.template](/client/.env.template) to `.env` and fill out
4. Run the program using one of the scripts in [package.json](/client/package.json)

# Notes
The app queries the [mcsrvstat API](https://api.mcsrvstat.us/) V3 each 1 minute for changes to the server status.
The app queries the specified `whitelist.json` file on app start. Ensure your `whitelist.json` TTL is short, so that the app does not cache the file for too long.