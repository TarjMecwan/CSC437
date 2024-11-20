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
var room_service_exports = {};
__export(room_service_exports, {
  create: () => create,
  default: () => room_service_default,
  get: () => get,
  index: () => index,
  remove: () => remove,
  update: () => update
});
module.exports = __toCommonJS(room_service_exports);
var import_room = require("../models/room");
async function index() {
  return await import_room.RoomModel.find();
}
async function get(id) {
  return await import_room.RoomModel.findOne({ id });
}
async function create(room) {
  const newRoom = new import_room.RoomModel(room);
  return await newRoom.save();
}
async function update(id, updatedRoom) {
  return await import_room.RoomModel.findOneAndUpdate({ id }, updatedRoom, { new: true }).then((room) => {
    if (!room)
      throw new Error(`${id} not updated`);
    return room;
  });
}
async function remove(id) {
  return await import_room.RoomModel.findOneAndDelete({ id }).then((room) => {
    if (!room)
      throw new Error(`${id} not deleted`);
  });
}
var room_service_default = { index, get, create, update, remove };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  get,
  index,
  remove,
  update
});
