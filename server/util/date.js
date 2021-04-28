const moment = require("moment");

module.exports = {
    getCurrentUTCDate() {
        let utc = moment.utc().valueOf();
        return moment.utc(utc).toDate();
    },
    getCurrentMonth() {
        return moment().format('MMM').toUpperCase()
    }
}
