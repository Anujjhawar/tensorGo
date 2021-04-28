const http = require("axios");

module.exports = {
    async call(api, method = "GET", data = "", headers = "", next) {
        await http.request({
            method: method,
            url: api,
            data: data,
            headers: headers
        })
            .then(function (response) {
                next(response);
            })
            .catch(function (error) {
                next(error);
            })
            .finally(function () {
                // always executed
            });
    }
}