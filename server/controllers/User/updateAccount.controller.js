const { user } = require("../../services/services");
const constants = require("../../config/constants");
const { master } = require("../../config/enum");
const joi = require("@hapi/joi");

module.exports = async function updateAccount(req, res) {
  if (await constants.validateRequest(req, querySchema, res)) {
    await user.UPDATE_ACCOUNT(req.body, async (e) => {
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
  name: joi.string().optional(),
  status: joi.string().optional(),
  gender: joi.string().optional(),
  email: joi.string().optional(),
  id: joi.number().required(),
  email: joi.string().required(),
  guid: joi.string().required(),
  isDeleted: joi.boolean().required(),
  createdAt: joi.string().optional(),
  updatedAt: joi.string().optional(),
});
//#endregion
