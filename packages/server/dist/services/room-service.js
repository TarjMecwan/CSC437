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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var room_service_exports = {};
__export(room_service_exports, {
  default: () => room_service_default
});
module.exports = __toCommonJS(room_service_exports);
var import_mongoose = require("mongoose");
const RoomSchema = new import_mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  availableFrom: { type: Date, required: true },
  availableTo: { type: Date, required: true },
  description: { type: String },
  amenities: [String],
  images: [String]
  // Store image paths or base64-encoded data
});
const RoomModel = (0, import_mongoose.model)("Room", RoomSchema);
var room_service_default = {
  index: () => __async(void 0, null, function* () {
    try {
      return yield RoomModel.find().exec();
    } catch (err) {
      throw new Error(`Failed to fetch rooms: ${err.message}`);
    }
  }),
  get: (id) => __async(void 0, null, function* () {
    try {
      return yield RoomModel.findById(id).exec();
    } catch (err) {
      throw new Error(`Failed to fetch room with ID ${id}: ${err.message}`);
    }
  }),
  create: (room) => __async(void 0, null, function* () {
    try {
      return yield new RoomModel(room).save();
    } catch (err) {
      throw new Error(`Failed to create room: ${err.message}`);
    }
  }),
  update: (id, room) => __async(void 0, null, function* () {
    try {
      return yield RoomModel.findByIdAndUpdate(id, room, { new: true }).exec();
    } catch (err) {
      throw new Error(`Failed to update room with ID ${id}: ${err.message}`);
    }
  }),
  remove: (id) => __async(void 0, null, function* () {
    try {
      return yield RoomModel.findByIdAndDelete(id).exec();
    } catch (err) {
      throw new Error(`Failed to delete room with ID ${id}: ${err.message}`);
    }
  })
};
