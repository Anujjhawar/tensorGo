const CryptoJS = require("crypto-js");
const constant = require("../config/constants");
const bcrypt = require('bcrypt');

module.exports = {
    encrypt(text) {
        return CryptoJS.AES.encrypt(text, constant.APP_KEY).toString();
    },
    decrypt(text) {
        var bytes = CryptoJS.AES.decrypt(text, constant.APP_KEY);
        return bytes.toString(CryptoJS.enc.Utf8)
    },
    encryptJson(json) {
        var text = JSON.stringify(json);
        return CryptoJS.AES.encrypt(text, constant.APP_KEY).toString();
    },
    decryptJson(text) {
        var bytes = CryptoJS.AES.decrypt(text, constant.APP_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    },
    async hash(pass) {
        const saltRound = 10;
        const hash = await bcrypt.hash(pass, saltRound);
        return hash;
    },
    async verify(pw, hash) {
        const result = await bcrypt.compare(pw, hash);
        return result;
    }
}