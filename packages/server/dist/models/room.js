var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var room_exports = {};
__export(room_exports, {
  default: () => room_default
});
module.exports = __toCommonJS(room_exports);
var import_express = __toESM(require("express"));
var import_multer = __toESM(require("multer"));
var import_path = __toESM(require("path"));
var import_room_service = __toESM(require("../services/room-service"));
const router = import_express.default.Router();
const storage = import_multer.default.diskStorage({
  destination: (req, file, cb) => {
    cb(null, import_path.default.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = (0, import_multer.default)({ storage });
router.get("/", (_, res) => {
  import_room_service.default.index().then((list) => res.json(list)).catch((err) => res.status(500).send(err));
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  import_room_service.default.get(id).then((room) => res.json(room)).catch((err) => res.status(404).send(err));
});
router.post("/", upload.array("images"), (req, res) => {
  const images = req.files ? req.files.map((file) => `/uploads/${file.filename}`) : [];
  const newRoom = __spreadProps(__spreadValues({}, req.body), { images });
  import_room_service.default.create(newRoom).then((room) => res.status(201).json(room)).catch((err) => res.status(500).send(err));
});
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedRoom = req.body;
  import_room_service.default.update(id, updatedRoom).then((room) => res.json(room)).catch((err) => res.status(404).send(err));
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  import_room_service.default.remove(id).then(() => res.status(204).end()).catch((err) => res.status(404).send(err));
});
var room_default = router;
