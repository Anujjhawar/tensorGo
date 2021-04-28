const { user } = require("../../services/services");
const constants = require("../../config/constants");
const { master } = require("../../config/enum");
const joi = require("@hapi/joi");

module.exports = async function deleteAccount(req, res) {
  if (await constants.validateRequest(req, querySchema, res)) {
    await user.DELETE_ACCOUNT(req.body, async (e) => {
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
  }
};

//#region JOI Validation
const querySchema = joi.object({
  guid: joi.string().required(),
});
//#endregion
