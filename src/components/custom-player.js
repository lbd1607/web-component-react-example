import React from "react";
import ReactDOM from "react-dom";
import PlayerElement from "./PlayerElement";

export default class CustomPlayerComponent extends HTMLElement {
  static get observedAttributes() {
    return ["title"];
  }

  createCollapsed(title) {
    return React.createElement(
      PlayerElement,
      { title },
      React.createElement("slot")
    );
  }

  connectedCallback() {
    this.mountPoint = document.createElement("div");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(this.mountPoint);

    const title = this.getAttribute("title");
    ReactDOM.render(this.createCollapsed(title), this.mountPoint);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title") {
      ReactDOM.render(this.createCollapsed(newValue), this.mountPoint);
    }
  }
}

window.customElements.define("custom-player", CustomPlayerComponent);
