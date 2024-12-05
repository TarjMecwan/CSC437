var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var rooms_exports = {};
__export(rooms_exports, {
  default: () => rooms_default
});
module.exports = __toCommonJS(rooms_exports);
var import_express = __toESM(require("express"));
var import_multer = __toESM(require("multer"));
var import_path = __toESM(require("path"));
var import_room_service = __toESM(require("../services/room-service"));
var import_auth = require("./auth");
const router = import_express.default.Router();
const storage = import_multer.default.diskStorage({
  destination: "./uploads",
  // Directory to store images
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = (0, import_multer.default)({ storage });
router.use("/uploads", import_express.default.static(import_path.default.join(__dirname, "../../uploads")));
router.post("/upload", import_auth.authenticateUser, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const filePath = `/uploads/${req.file.filename}`;
  res.status(200).json({ path: filePath });
});
router.get("/", (_, res) => {
  import_room_service.default.index().then((list) => res.json(list)).catch((err) => res.status(500).send(err));
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  import_room_service.default.get(id).then((room) => {
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.json(room);
  }).catch((err) => res.status(500).send(err));
});
router.post("/", import_auth.authenticateUser, (req, res) => {
  const newRoom = req.body;
  import_room_service.default.create(newRoom).then((room) => res.status(201).json(room)).catch((err) => {
    console.error("Error creating room:", err);
    res.status(500).json({ error: "Failed to create room", details: err.message });
  });
});
router.put("/:id", import_auth.authenticateUser, (req, res) => {
  const { id } = req.params;
  const updatedRoom = req.body;
  import_room_service.default.update(id, updatedRoom).then((room) => {
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.json(room);
  }).catch((err) => {
    console.error("Error updating room:", err);
    res.status(500).json({ error: "Failed to update room", details: err.message });
  });
});
router.delete("/:id", import_auth.authenticateUser, (req, res) => {
  const { id } = req.params;
  import_room_service.default.remove(id).then((result) => {
    if (!result) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.status(204).end();
  }).catch((err) => {
    console.error("Error deleting room:", err);
    res.status(500).json({ error: "Failed to delete room", details: err.message });
  });
});
var rooms_default = router;
