export class RoomListingsElement extends HTMLElement {
    static template = document.createElement("template");
    static styles = `
      :host {
        display: block;
        margin: 1rem 0;
      }
    `;
  
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>${RoomListingsElement.styles}</style>
        <slot></slot>
      `;
    }
  
    get src() {
      return this.getAttribute("src");
    }
  
    connectedCallback() {
      if (this.src) this.hydrate(this.src);
    }
  
    hydrate(url) {
      fetch(url)
        .then((res) => {
          if (res.status !== 200) throw `Status: ${res.status}`;
          return res.json();
        })
        .then((rooms) => this.renderRooms(rooms))
        .catch((error) => console.error(`Failed to fetch data from ${url}:`, error));
    }
  
    renderRooms(rooms) {
      const slots = rooms.map((room) => {
        return `
          <room-listing
            src="/api/rooms/${room.id}">
          </room-listing>
        `;
      });
  
      this.shadowRoot.innerHTML = `
        <style>${RoomListingsElement.styles}</style>
        ${slots.join("")}
      `;
    }
  }
  
  customElements.define("room-listings", RoomListingsElement);
  