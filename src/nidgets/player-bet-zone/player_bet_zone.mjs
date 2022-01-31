import NidgetElement from "@nidget/core";

class PlayerBetZone extends NidgetElement {

    constructor() {
        super("player-bet-zone-template");
    }
}

window.customElements.define('player-bet-zone', PlayerBetZone);
export default PlayerBetZone;