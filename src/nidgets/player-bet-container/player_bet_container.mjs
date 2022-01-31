import NidgetElement from "@nidget/core";

class PlayerBetContainer extends NidgetElement {

    constructor() {
        super("player-bet-container-template");
    }
}

window.customElements.define('player-bet-container', PlayerBetContainer);
export default PlayerBetContainer;