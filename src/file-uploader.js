window.customElements.define('file-uploader', class extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        let self = this;
        window.Lzsoft.Import.ByTagImport(self);
        self.querySelector("input").addEventListener("change", function() {
            console.log(this.files);
        });
        self.addEventListener("click", function() {
            self.querySelector("input").click();
        });
    }
});
