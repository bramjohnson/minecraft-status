import StatusPage from './status/StatusPage';
import OptionalWhitelistChecker from './whitelist/OptionalWhitelistChecker';

const MY_MINECRAFT_SERVER = import.meta.env.VITE_MINECRAFT_SERVER_IP;
const MY_WHITELIST_URL = import.meta.env.VITE_WHITELIST_URL;
console.log(MY_MINECRAFT_SERVER, MY_WHITELIST_URL);

const CLIPBOARD_TEXT_TIMEOUT = 1000;

const copyToClipboard = () => {
  // Copy to clipbaord
  navigator.clipboard.writeText(MY_MINECRAFT_SERVER);

  const serverIPElement = document.getElementById('server-ip')!;
  serverIPElement.textContent = 'Copied to clipboard!';

  setTimeout(() => {
    serverIPElement.textContent = MY_MINECRAFT_SERVER;
  }, CLIPBOARD_TEXT_TIMEOUT);
}

function App() {
  return (
    <div id="app">
      <div id='server-title'>
        <span id="server-ip">{MY_MINECRAFT_SERVER}</span>
        <span id="server-ip-copy-icon" className="material-icons" onClick={copyToClipboard}>content_copy</span>
      </div>
      <OptionalWhitelistChecker whitelistDataUrl={MY_WHITELIST_URL} />
      <StatusPage serverIP={MY_MINECRAFT_SERVER} />
    </div>
  )
}

export default App
