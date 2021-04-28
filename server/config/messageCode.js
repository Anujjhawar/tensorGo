//#region Global Response Handler
function response(d, res) {
  let response = "";
  if (d.data != null) {
    let message =
      d.code != undefined && d.code.startsWith("SUCCESS_")
        ? d.code
        : success.SUCCESS;
    response = {
      data: d.data,
      code: 200,
      status: true,
      message,
    };
  } else {
    let message =
      d.data == null
        ? d.code != undefined && d.code.startsWith("ERROR_")
          ? d.code
          : errors.ERROR
        : d.code;
    let error =
      d.data == null
        ? d.error != null
          ? d.error
          : errors.DATA_NOT_FOUND
        : d.error;
    response = {
      error,
      status: false,
      code: 100,
      message,
    };
  }
  let status = 200;
  if (d.status != undefined) {
    status = d.status;
  }
  return res.status(status).json(response);
}
//#endregion

function snatizeBody(req) {
  // TBD : need to snatize each depth of Parameters
  return req.body;
}

//#region Validate Request
// d --> Data
// schema --> schema of Data
async function validateRequest(req, schema, res, doSanatize = true) {
  if (doSanatize) {
    req.body = snatizeBody(req);
  }
  const { error } = await schema.validate(req.body);
  if (error == null) {
    return true;
  } else {
    response(
      {
        error: error.details[0].message,
        code: errors.INVALID_REQUEST,
      },
      res
    );
    return false;
  }
}
//#endregion

//#region Check Any Object for IsEmpty
function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return obj;
  }

  return null;
}
//#endregion

const errors = {
  ERROR: "ERROR",
  SOMETHING_FAILED: "ERROR_SOMETHING_FAILED",
  HOLIDAY_ALREADY_EXIST: "ERROR_HOLIDAY_ALREADY_EXIST",
  ACC_DETAIL_ALREADY_EXIST: "ERROR_ACC_DETAIL_ALREADY_EXIST",
  ACC_INACTIVE: "ERROR_ACC_INACTIVE",
  ACC_SERVICE_ALREADY_EXIST: "ERROR_ACC_SERVICE_ALREADY_EXIST",
  BOOKING_ALREADY_EXIST: "ERROR_BOOKING_ALREADY_EXIST",
  SLOTS_ALREADY_EXIST: "ERROR_SLOTS_ALREADY_EXIST",
  CATEGORY_ALREADY_EXIST: "ERROR_CATEGORY_ALREADY_EXIST",
  CITY_ALREADY_EXIST: "ERROR_CITY_ALREADY_EXIST",
  ACC_ALREADY_EXIST: "ERROR_ACC_ALREADY_EXIST",
  USER_ALREADY_EXIST: "ERROR_USER_ALREADY_EXIST",
  RATING_ALREADY_EXIST: "ERROR_RATING_ALREADY_EXIST",
  ACC_NOT_FOUND: "ERROR_ACC_NOT_FOUND",
  DATABASE_FAILURE: "ERROR_DATABSAE_FAILURE",
  LOGIN_ERROR: "ERROR_LOGIN",
  OTP_MATCH_ERROR: "ERROR_OTP_MATCH",
  FAILURE: "ERROR_FAILURE",
  INTERNAL_SERVER_ERROR: "ERROR_500",
  TOKEN_EXPIRED: "ERROR_TOKEN_EXPIRED",
  TOKEN_NOT_FOUND: "ERROR_TOKEN_NOT_FOUND",
  UNAUTHORIZE_ACCESS: "ERROR_UNAUTHORIZE_ACCESS",
  INVALID_REQUEST: "ERROR_INVALID_REQUEST",
  SLOT_NOT_FOUND: "ERROR_SLOT_NOT_FOUND",
  DATA_NOT_FOUND: "ERROR_DATA_NOT_FOUND",
  USER_UNAUTHORIZE_ACCESS: "ERROR_USER_UNAUTHORIZED_ACCESS",
  USER_TOKEN_NOT_FOUND: "ERROR_USER_TOKEN_NOT_FOUND",
  USER_TOKEN_EXPIRED: "ERROR_USER_TOKEN_EXPIRED",
  HOLIDAY: "ERROR_HOLIDAY",
  AVAILABLE_SLOT_COUNT_MISMATCH: "ERROR_AVAILABLE_SLOT_COUNT_MISMATCH",
};
const success = {
  SUCCESS: "SUCCESS",
  ACC_DETAIL_ADDED: "SUCCESS_ACC_DETAIL_ADDED",
  CITY_ADDED: "SUCCESS_CITY_ADDED",
  PASSWORD_CHANGE: "SUCCESS_PASSWORD_CHANGE",
  LOGIN: "SUCCESS_LOGIN",
  OTP: "SUCCESS_OTP_SENT",
  VERIFY: "SUCCESS_VERIFIED",
  INSERT: "SUCCESS_INSERT",
  DELETE: "SUCCESS_DELETE",
  UPDATE: "SUCCESS_UPDATE",
  DATA_FOUND: "SUCCESS_DATA_FOUND",
};
module.exports = {
  ...errors,
  ...success,
  response,
  validateRequest,
  isEmpty,
};
