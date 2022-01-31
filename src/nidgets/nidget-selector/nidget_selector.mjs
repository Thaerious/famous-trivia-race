import NidgetElement from "@nidget/core";

class NidgetSelector extends NidgetElement {
    constructor() {
        super("nidget-selector-template");
    }

    async ready() {
        this.addEventListener("touchstart", event => {
            if (this.querySelector("#options").classList.contains("show")) return;
            this.touchStartTimer = setTimeout(() => {
                clearTimeout(this.touchStartTimer);
                this.showOptions();
            }, 50);
        });

        // this.addEventListener("touchend", event => {
        //     if (this.touchStartTimer) clearTimeout(this.touchStartTimer);
        //     this.hideOptions();
        // });

        this.querySelectorAll(".option").forEach(element => {
            element.addEventListener("pointerover", event => {
                console.log(event);
            });
        });
    }

    showOptions() {
        console.log("show options");
        this.querySelector("#selected").classList.remove("show");
        this.querySelector("#options").classList.add("show");
        console.log(this.querySelector("#selected"));
        console.log(this.querySelector("#options"));
    }

    hideOptions() {
        console.log("show options");
        this.querySelector("#selected").classList.add("show");
        this.querySelector("#options").classList.remove("show");
    }
}

window.customElements.define("nidget-selector", NidgetSelector);
export default NidgetSelector;
