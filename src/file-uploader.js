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
            if (this.files[0] && self.hasAttribute("data-upload-url")) {
                window.Lzsoft.Api.Core(self.getAttribute("data-upload-url"), {
                    requestContentType: this.files[0].type,
                    requestData: this.files[0]
                }).then(function(result) {
                    result.json().then(function(json) {
                        if (json) {
                            self.setAttribute("data-id", json.id);
                        }
                    }).catch(function() {
                        // Returning info is not a json
                    });
                });
            }
        });
        self.addEventListener("click", function() {
            self.querySelector("input").click();
        });
    }
    attributeChangedCallback(name, oldValue, newValue) {
        let self = this;
        if (self.hasAttribute("data-meta-url") && newValue) {
            window.Lzsoft.Api.Core(self.getAttribute("data-meta-url"), {
                requestContentType: "application/json",
                requestData: JSON.stringify({ id: newValue })
            }).then(function(result) {
                result.json().then(function(json) {
                    if (json) {
                        if (json.url && json.contentCategory === "image") {
                            self.style.backgroundImage = `url(${json.url})`;
                        }
                    }
                }).catch(function() {
                    // Returning info is not a json
                });
            });
        }
    }
});
