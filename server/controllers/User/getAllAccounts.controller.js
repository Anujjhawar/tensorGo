const { user } = require("../../services/services");
const constants = require("../../config/constants");
const { master } = require("../../config/enum");

module.exports = async function getAllAccounts(req, res) {
  await user.GET_ALL_ACCOUNTS(async (e) => {
    let response;
    switch (e) {
      case master.DATABASE_FAILURE: {
        response = {
          error: "Database Failure",
          code: constants.DATABASE_FAILURE,
        };
        break;
      }
      default: {
        response = {
          data: e,
          code: constants.SUCCESS,
        };
        break;
      }
    }
    return constants.response(response, res);
  });
};
