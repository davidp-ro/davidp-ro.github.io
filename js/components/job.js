class Job extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const title = this.getAttribute('data-title');
    const location = this.getAttribute('data-location');
    const period = this.getAttribute('data-period');

    const container = document.createElement("div");

    const style = document.createElement("style");
    style.textContent = /*css*/ `
      /* todo */
    `;

    shadow.appendChild(style);
    shadow.appendChild(container);
  }
}

customElements.define('job', Job);
