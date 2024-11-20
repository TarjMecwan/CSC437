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
  createRoom: () => createRoom,
  deleteRoom: () => deleteRoom,
  getAllRooms: () => getAllRooms,
  getRoomById: () => getRoomById
});
module.exports = __toCommonJS(room_service_exports);
var import_room = require("../models/room");
async function getAllRooms() {
  return await import_room.RoomModel.find();
}
async function getRoomById(id) {
  return await import_room.RoomModel.findOne({ id });
}
async function createRoom(room) {
  const newRoom = new import_room.RoomModel(room);
  return await newRoom.save();
}
async function deleteRoom(id) {
  return await import_room.RoomModel.deleteOne({ id });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoomById
});
