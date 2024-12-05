export class RoomListingsElement extends HTMLElement {
  static template = document.createElement("template");
  static styles = `
    :host {
      display: block;
      margin: 1rem 0;
    }

    .room-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
      background-color: #fff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .room-card h3 {
      margin: 0 0 8px 0;
    }

    .room-card p {
      margin: 4px 0;
    }

    .room-card .images {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 16px;
    }

    .room-card .room-image {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
    if (this.src) this.hydrate(this.src);
  }

  async hydrate(url) {
    try {
      const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage
      if (!token) {
        throw new Error("User not authenticated. Please log in.");
      }

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the Authorization header
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText}`);
      }

      const rooms = await res.json();
      this.renderRooms(rooms);
    } catch (error) {
      console.error(`Failed to fetch data from ${url}:`, error);
    }
  }

  renderRooms(rooms) {
    const container = this.shadowRoot.querySelector("#listings-container");
    container.innerHTML = ""; // Clear previous listings

    rooms.forEach((room) => {
      const roomElement = document.createElement("div");
      roomElement.classList.add("room-card");

      // Generate HTML for room images
      const imagesHtml = (room.images || [])
        .map(
          (imgPath) => `
          <img src="${imgPath}" alt="${room.title}" class="room-image" />
        `
        )
        .join("");

      // Generate HTML for room details
      roomElement.innerHTML = `
        <h3>${room.title}</h3>
        <p><strong>Location:</strong> ${room.location}</p>
        <p><strong>Price:</strong> $${room.price}</p>
        <p><strong>Available:</strong> ${new Date(
          room.availableFrom
        ).toLocaleDateString()} to ${new Date(
        room.availableTo
      ).toLocaleDateString()}</p>
        <p><strong>Description:</strong> ${room.description}</p>
        <ul><strong>Amenities:</strong>
          ${room.amenities
            .map((a) => `<li>${a}</li>`)
            .join("") || "<li>No amenities listed</li>"}
        </ul>
        <div class="images">
          ${imagesHtml}
        </div>
      `;
      container.appendChild(roomElement);
    });
  }
}

customElements.define("room-listings", RoomListingsElement);
