"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkInstallments = void 0;
var _iyzipay = _interopRequireDefault(require("../connection/iyzipay"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const checkInstallments = data => {
  return new Promise((resolve, reject) => {
    _iyzipay.default.installmentInfo.retrieve(data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
exports.checkInstallments = checkInstallments;