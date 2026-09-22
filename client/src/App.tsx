import StatusPage from "./status/StatusPage";

const MY_LIMITED_SERVER = import.meta.env
  .VITE_MINECRAFT_LIMITED_MANAGEMENT_SERVER;
const MINECRAFT_SERVER_IP = import.meta.env.VITE_MINECRAFT_SERVER_IP;

const CLIPBOARD_TEXT_TIMEOUT = 1000;

const copyToClipboard = () => {
  // Copy to clipbaord
  navigator.clipboard.writeText(MINECRAFT_SERVER_IP);

  const serverIPElement = document.getElementById("server-ip")!;
  serverIPElement.textContent = "Copied to clipboard!";

  setTimeout(() => {
    serverIPElement.textContent = MINECRAFT_SERVER_IP;
  }, CLIPBOARD_TEXT_TIMEOUT);
};

function App() {
  return (
    <div id="app">
      <div id="server-title">
        <span id="server-ip">{MINECRAFT_SERVER_IP}</span>
        <span
          id="server-ip-copy-icon"
          className="material-icons"
          onClick={copyToClipboard}
        >
          content_copy
        </span>
      </div>
      <StatusPage
        managementAPI={MY_LIMITED_SERVER}
        serverIP={MINECRAFT_SERVER_IP}
      />
    </div>
  );
}

export default App;
