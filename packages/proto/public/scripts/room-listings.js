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
      <div id="listings-container"></div>
    `;
  }

  get src() {
    return this.getAttribute("src");
  }

  connectedCallback() {
    if (this.src) this.hydrate(this.src); // Fetch and display room listings
  }

  async hydrate(url) {
    try {
      const token = localStorage.getItem("authToken"); // Get the JWT token from localStorage
      if (!token) {
        throw new Error("User not authenticated. Please log in.");
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}: Status ${response.status}`);
      }

      const rooms = await response.json();
      this.renderRooms(rooms); // Render the fetched rooms
    } catch (error) {
      console.error(`Error fetching room listings:`, error);
      this.displayError(error.message);
    }
  }

  renderRooms(rooms) {
    const container = this.shadowRoot.querySelector("#listings-container");
    container.innerHTML = ""; // Clear previous listings

    if (!rooms.length) {
      container.innerHTML = `<p>No listings available.</p>`;
      return;
    }

    rooms.forEach((room) => {
      const roomElement = document.createElement("div");
      roomElement.classList.add("room-listing");
      roomElement.innerHTML = `
        <div class="room-card">
          <h3>${room.title}</h3>
          <p><strong>Location:</strong> ${room.location}</p>
          <p><strong>Price:</strong> $${room.price}</p>
          <p><strong>Available:</strong> ${new Date(room.availableFrom).toLocaleDateString()} to ${new Date(room.availableTo).toLocaleDateString()}</p>
          <p>${room.description || "No description available."}</p>
          <ul>
            ${room.amenities.map((amenity) => `<li>${amenity}</li>`).join("")}
          </ul>
        </div>
      `;
      container.appendChild(roomElement);
    });
  }

  displayError(message) {
    const container = this.shadowRoot.querySelector("#listings-container");
    container.innerHTML = `<p style="color: red;">${message}</p>`;
  }
}

customElements.define("room-listings", RoomListingsElement);
