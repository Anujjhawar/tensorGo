const { user } = require("../../services/services");
const constants = require("../../config/constants");
const joi = require("@hapi/joi");
const { master } = require("../../config/enum");

module.exports = async function addAccount(req, res) {
  if (await constants.validateRequest(req, querySchema, res)) {
    await user.ADD_ACCOUNT(req.body, async (e) => {
      let response;
      switch (e) {
        case master.ALREADY_EXIST: {
          response = {
            error: "Account Already Exist",
            code: constants.ACC_ALREADY_EXIST,
          };
          break;
        }
        case master.SERVER_ERROR: {
          response = {
            error: "Something Broken.",
            code: constants.SOMETHING_FAILED,
          };
          break;
        }
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
  name: joi.string().required().messages({
    "string.empty": "name can't be Empty",
    "string.base": "name Field can Accept only String",
    "any.required": "name is Required Field",
  }),
  email: joi.string().required().messages({
    "string.empty": "email can't be Empty",
    "any.required": "email is Required Field",
    "string.base": "email Field can Accept only String",
  }),
  status: joi.string().required().messages({
    "string.empty": "status can't be Empty",
    "string.base": "status Field can Accept only String",
    "any.required": "status is Required Field",
  }),
  gender: joi.string().required().messages({
    "string.empty": "gender can't be Empty",
    "string.base": "gender Field can Accept only String",
    "any.required": "gender is Required Field",
  }),
});
//#endregion
