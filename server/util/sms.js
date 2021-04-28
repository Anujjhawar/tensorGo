const rest = require('./rest');

module.exports = {
    async sendSMS(r) {
        const api = "http://144.76.190.68/sendSMS?username=bigbarber&message=" + r.msg + "&sendername=BARBER&smstype=TRANS&numbers=" + r.phone + "&apikey=72a0fd70-799d-4359-b904-04f964f20cd0"
        console.log("=============SMSAPI = ", api);
        await rest.call(api, "GET", "", "", (response) => {
            return response.data;
        });
    }
}