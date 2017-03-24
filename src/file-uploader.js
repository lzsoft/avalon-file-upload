window.customElements.define('file-uploader', class extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        let self = this;
        window.Lzsoft.Import.ByTagImport(self);
        self.querySelector("input").addEventListener("change", function() {
            window.Lzsoft.Api.Core(self.getAttribute("data-url"), {
                requestContentType: this.files[0].type,
                requestData: this.files[0]
            }).then(function(result) {
                console.log(result);
            });
        });
        self.addEventListener("click", function() {
            self.querySelector("input").click();
        });
    }
});
