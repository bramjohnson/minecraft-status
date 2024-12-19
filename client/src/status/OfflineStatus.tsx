
function OfflineStatus() {
    document.title = 'Offline - Minecraft Server Status';

    return (
        <>
            <div id="status-dashboard">
                <div id="status-header">
                    <div id="online-status">
                        <span id="offline-status-icon" className="material-icons">wifi_tethering_off</span>
                        <h2 id="online-status-text">Offline</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OfflineStatus

