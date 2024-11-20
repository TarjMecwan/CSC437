"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_express = __toESM(require("express"));
var import_path = __toESM(require("path"));
var import_mongo = require("./services/mongo");
var import_room_service = require("./services/room-service");
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
app.use(import_express.default.json());
(0, import_mongo.connect)("lab10db");
app.use(import_express.default.static(import_path.default.join(__dirname, "../../proto/public")));
app.get("/api/rooms", async (req, res) => {
  const rooms = await (0, import_room_service.getAllRooms)();
  res.json(rooms);
});
app.get("/api/rooms/:id", async (req, res) => {
  const room = await (0, import_room_service.getRoomById)(req.params.id);
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }
  res.json(room);
});
app.post("/api/rooms", async (req, res) => {
  const newRoom = await (0, import_room_service.createRoom)(req.body);
  res.status(201).json(newRoom);
});
app.delete("/api/rooms/:id", async (req, res) => {
  const result = await (0, import_room_service.deleteRoom)(req.params.id);
  if (result.deletedCount === 0) {
    return res.status(404).json({ error: "Room not found" });
  }
  res.status(204).send();
});
app.get("*", (req, res) => {
  res.sendFile(import_path.default.join(__dirname, "../../proto/public/index.html"));
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
