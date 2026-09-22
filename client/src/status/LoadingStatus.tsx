import LoadingText from "./LoadingText";

function LoadingStatus() {
  document.title = "Loading - Minecraft Server Status";

  return (
    <>
      <div id="status-dashboard">
        <div id="status-header">
          <div id="online-status">
            <span id="loading-status-icon" className="material-icons">
              wifi_tethering_off
            </span>
            <h2 id="online-status-text">
              <LoadingText />
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoadingStatus;
