"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _nanoid = _interopRequireDefault(require("../utils/nanoid"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  Schema
} = _mongoose.default;
const {
  ObjectId
} = Schema.Types;
const CartsSchema = new Schema({
  uid: {
    type: String,
    default: (0, _nanoid.default)(),
    unique: true,
    required: true
  },
  completed: {
    type: Boolean,
    default: false,
    required: true
  },
  buyer: {
    type: ObjectId,
    ref: "Users",
    required: true
  },
  products: {
    type: [ObjectId],
    ref: "Products",
    required: true
  },
  currency: {
    type: String,
    required: true,
    default: "TRY",
    enum: ["TRY", "USD", "EUR"]
  }
}, {
  _id: true,
  collection: "carts",
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      return {
        ...ret
      };
    }
  }
});
const Carts = _mongoose.default.model("Carts", CartsSchema);
Carts.starterData = {
  _id: new _mongoose.default.Types.ObjectId('61d05524bf858c7449e9d456'),
  buyer: new _mongoose.default.Types.ObjectId('61d054de0d8af19519e88a61'),
  completed: false,
  products: [new _mongoose.default.Types.ObjectId('61d054e5a2f56187efb0a3b2'), new _mongoose.default.Types.ObjectId('61d055016272c60f701be7ac'), new _mongoose.default.Types.ObjectId('61d055095087612ecee33a20')],
  currency: 'TRY'
};
Carts.initializer = async () => {
  const count = await Carts.estimatedDocumentCount();
  if (count === 0) {
    const created = await Carts.create(Carts.starterData);
    console.log(`${created.length} Carts created`);
    console.log(Carts.starterData);
  }
};
Carts.populationTest = async () => {
  const cart = await Carts.findOne({
    _id: Carts.starterData._id
  }).populate('products', {
    name: 1,
    price: 1,
    categories: 1,
    brand: 1,
    images: 1,
    currency: 1,
    stock: 1,
    itemType: 1
  }).populate('buyer');
  console.log(cart);
};

/* Carts.initializer().then(async res => {
    await Carts.populationTest()
}); */
//Carts.populationTest();
var _default = Carts;
exports.default = _default;