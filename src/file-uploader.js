window.customElements.define('file-uploader', class extends HTMLElement {
    static get observedAttributes() {
        return ['data-id'];
    }
    constructor() {
        super();
    }
    connectedCallback() {
        let self = this;
        window.Lzsoft.Import.ByTagImport(self);
        self.querySelector("input").addEventListener("change", function() {
            if (this.files[0]) {
                window.Lzsoft.Api.Core(self.getAttribute("data-url"), {
                    requestContentType: this.files[0].type,
                    requestData: this.files[0]
                }).then(function(result) {
                    result.json().then(function(json) {
                        let info = json || {};
                        if (info.id) {
                            self.setAttribute("data-id", json.id);
                        }
                        if (info.url && info.contentCategory === "image") {
                            self.style.backgroundImage = `url(${info.url})`;
                        }
                    }).catch(function(e) {
                        // Returning info is not a json
                    });
                });
            }
        });
        self.addEventListener("click", function() {
            self.querySelector("input").click();
        });
    }
    attributeChangedCallback(name, oldValue, newValue) {}
});
