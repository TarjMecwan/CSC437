"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var room_exports = {};
__export(room_exports, {
  RoomModel: () => RoomModel
});
module.exports = __toCommonJS(room_exports);
var import_mongoose = require("mongoose");
const RoomSchema = new import_mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  availableFrom: { type: Date, required: true },
  availableTo: { type: Date, required: true },
  description: { type: String, required: true },
  amenities: { type: [String], required: true },
  images: { type: [String], required: true }
});
const RoomModel = (0, import_mongoose.model)("Room", RoomSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RoomModel
});
