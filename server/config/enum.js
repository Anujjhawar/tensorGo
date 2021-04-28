const master = {
    DATABASE_FAILURE: 1000,
    ALREADY_EXIST: 101,
    NO_DATA_FOUND: 100,
    SERVER_ERROR: 6,
};

//#region Account Detail & Account ENUMERATIONS
const accountEnum = {
    DATABASE_FAILURE: master.DATABASE_FAILURE,
    ACC_DETAIL_ALREADY_EXIST: master.ALREADY_EXIST,
    ACC_IS_INACTIVE: master.ACCOUNT_INACTIVE,
    PASSWORD_MISMATCH: 3,
    ACC_NOT_FOUND: 2,
    ALREADY_DELETED: 100,
    OTP_MISMATCH: 4,
};
//#endregion

//#region User Enumerations
const userEnum = {
    DATABASE_FAILURE: master.DATABASE_FAILURE,
    ALREADY_EXIST: master.ALREADY_EXIST,
    OTP_MISMATCH: 2,
    USER_NOT_FOUND: 3,
};
//#endregion

//#region Booking Enumerations
const bookingEnum = {
    DATABASE_FAILURE: master.DATABASE_FAILURE,
    ALREADY_EXIST: master.ALREADY_EXIST,
    NO_DATA_FOUND: master.NO_DATA_FOUND,
    HOLIDAY: master.HOLIDAY,
    NO_SLOT_FOUND: 10,
    AVAILABLE_SLOT_COUNT_MISMATCH: 11,
};
//#endregion

module.exports = {
    master,
    accountEnum,
    userEnum,
    bookingEnum,
};