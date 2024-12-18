
import { useState } from 'react';
import { useWhitelist } from '../hooks/getWhitelist'

const getWhitelistedSymbol = (username: string, predicate: (username: string) => boolean) => {
    if (!username || username === '') {
        return 'help';
    } else if (predicate(username)) {
        return 'verified';
    } else {
        return 'block';
    }
}

function WhitelistChecker({ whitelistDataUrl }: { whitelistDataUrl: string }) {
    const [usernameInput, setUsernameInput] = useState<string>('');
    const isUsernameWhitelisted = useWhitelist(whitelistDataUrl);

    const whitelistedSymbol = getWhitelistedSymbol(usernameInput, isUsernameWhitelisted);

    return (
        <div id="whitelist" >
            <div id="whitelist-check">
                <span id='whitelist-label'>Am I Whitelisted?</span>
                <input type="text" id="whitelist_username" placeholder="MyUsername" onInput={(event) => setUsernameInput(event.currentTarget.value)} />
                <span id="is-whitelisted-symbol" className="material-icons">{whitelistedSymbol}</span>
            </div>
        </div>
    )
}

export default WhitelistChecker



