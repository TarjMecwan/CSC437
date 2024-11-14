import { css, html, shadow } from "https://unpkg.com/@calpoly/mustang";

export class SubletListingElement extends HTMLElement {
  static template = html`
    <template>
      <div class="listing-card">
        <img slot="image" class="listing-image" />
        <div class="listing-info">
          <p class="listing-address"><slot name="address"></slot></p>
          <p class="listing-details"><slot name="details"></slot></p>
          <p class="distance"><slot name="distance"></slot></p>
          <button class="details-button"><slot name="button">Details</slot></button>
        </div>
      </div>
    </template>
  `;

  static styles = css`
    .listing-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 300px;
      margin: 10px;
      overflow: hidden;
      text-align: left;
      display: flex;
      flex-direction: column;
    }
    .listing-image {
      width: 100%;
      max-height: 200px; /* Constrain image height */
      object-fit: cover; /* Crop images to fit within the card */
    }
    .listing-info {
      padding: 20px;
    }
    .listing-address {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .listing-details {
      font-size: 16px;
      color: #666;
    }
    .distance {
      font-size: 14px;
      color: #888;
    }
    .details-button {
      background-color: #007BFF;
      color: white;
      padding: 10px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      width: 100%;
      text-align: center;
      margin-top: 10px;
    }
    .details-button:hover {
      background-color: #0056b3;
    }
  `;

  constructor() {
    super();
    shadow(this).template(SubletListingElement.template).styles(SubletListingElement.styles);
  }
}
