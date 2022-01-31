import NidgetElement from "@nidget/core";

/**
 * Attribute selected defines whether the nidget is filled in.
 * Use css attribute '--ribbon-toggle-color' to declare the selected color.
 */
class RibbonToggle extends NidgetElement {

    constructor() {
        super("ribbon-toggle-template");
    }

    async ready(){
        this.querySelector("#label").innerHTML = this.innerHTML;
        this.innerHTML = "";

        this.addEventListener("click", event=>{
            console.log("click");
            this.selected = !this.selected;
        });
    }

    get selected(){
        return this.classList.contains(RibbonToggle.constants.SELECTED);
    }

    set selected(value){
        if (value){
            this.classList.add(RibbonToggle.constants.SELECTED);            
        }
        else {
            this.classList.remove(RibbonToggle.constants.SELECTED);            
        }
    }
}

RibbonToggle.constants = {
    SELECTED : "selected"
}

window.customElements.define('ribbon-toggle', RibbonToggle);
export default RibbonToggle;