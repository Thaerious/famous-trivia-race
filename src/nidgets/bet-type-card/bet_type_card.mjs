import NidgetElement from "@nidget/core";

class BetTypeCard extends NidgetElement {

    constructor() {
        super("bet-type-card-template");
    }

    async ready(){
        this.addEventListener("click", event=>{
            console.log(event);
        });
    }
}

window.customElements.define('bet-type-card', BetTypeCard);
export default BetTypeCard;