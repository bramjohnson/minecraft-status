
import WhitelistChecker from './WhitelistChecker';

function OptionalWhitelistChecker({ whitelistDataUrl }: { whitelistDataUrl: string | undefined }) {
    return whitelistDataUrl === undefined ? <></> : <WhitelistChecker whitelistDataUrl={whitelistDataUrl} />
}

export default OptionalWhitelistChecker
