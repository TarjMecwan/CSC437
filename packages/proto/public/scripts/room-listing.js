export class RoomListingElement extends HTMLElement {
    static template = document.createElement("template");
    static styles = `
      /* Add any specific styles here for the custom element */
      :host {
        display: block;
        margin: 1rem 0;
      }
    `;
  
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>${RoomListingElement.styles}</style>
        <slot></slot>
      `;
    }
  
    // Getter for the src attribute
    get src() {
      return this.getAttribute("src");
    }
  
    // Lifecycle method to handle when the element is connected to the DOM
    connectedCallback() {
      if (this.src) this.hydrate(this.src);
    }
  
    // Fetch data from the REST API
    hydrate(url) {
      fetch(url)
        .then((res) => {
          if (res.status !== 200) throw `Status: ${res.status}`;
          return res.json();
        })
        .then((json) => this.renderSlots(json))
        .catch((error) => console.error(`Failed to fetch data from ${url}:`, error));
    }
  
    // Render JSON data into the slots
    renderSlots(data) {
      const entries = Object.entries(data);
      const slots = entries.map(([key, value]) => {
        if (key === "images" && Array.isArray(value)) {
          // Handle images array separately
          return value.map((img) => `<img slot="image" src="${img}" />`).join("");
        } else if (key === "amenities" && Array.isArray(value)) {
          // Render amenities as a list
          return `<ul slot="amenities">${value.map((item) => `<li>${item}</li>`).join("")}</ul>`;
        } else {
          // Default rendering for strings and numbers
          return `<span slot="${key}">${value}</span>`;
        }
      });
  
      // Update the shadow DOM with the new content
      this.shadowRoot.innerHTML = `
        <style>${RoomListingElement.styles}</style>
        ${slots.join("")}
      `;
    }
  }
  
  // Define the custom element
  customElements.define("room-listing", RoomListingElement);
  