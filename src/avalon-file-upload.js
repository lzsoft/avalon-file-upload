window.customElements.define('avalon-file-upload', class extends window.HTMLTinplateElement {
    static get observedAttributes() {
        return ['data-id'];
    }
    constructor() {
        super();
    }
    connectedCallback() {
        let self = this;
        self.querySelector("input").addEventListener("change", async function() {
            if (this.files[0] && self.hasAttribute("data-url")) {
                let json = await window.Lzsoft.Api.Put(self.getAttribute("data-url"), this.files[0]);
                if (json) {
                    self.setAttribute("data-id", json.id);
                }
            }
        });
        self.addEventListener("click", function() {
            self.querySelector("input").click();
        });
    }
    async attributeChangedCallback(name, oldValue, newValue) {
        let self = this;
        if (self.hasAttribute("data-url") && newValue) {
            let json = await window.Lzsoft.Api.Get(self.getAttribute("data-url"), { id: newValue });
            if (json) {
                if (json.url && json.contentCategory === "image") {
                    self.style.backgroundImage = `url(${json.url})`;
                }
            }
        }
    }
});
