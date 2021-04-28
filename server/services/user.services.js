const { user } = require("../models/model");
const { randomUUID } = require("make-random");
const { master } = require("../config/enum");
const { rest } = require("../util/util");

const token =
  "edc41e6fcc3527cfc2062a432f5cf33dea7e19e91d37ccfbf3e402994ae25320";
const url = "https://gorest.co.in/public-api/users";

module.exports = {
  ADD_ACCOUNT: addAccount,
  UPDATE_ACCOUNT: updateAccount,
  DELETE_ACCOUNT: deletedAccount,
  GET_ALL_ACCOUNTS: getAllAccounts,
};

//#region Add Account
async function addAccount(data, next) {
  let res;
  rest
    .call(
      url,
      "POST",
      data,
      {
        Authorization: "Bearer " + token,
      },
      async (response) => {
        if (response.data.code == 201) {
          response.data.data.guid = await randomUUID();
          await user
            .create(response.data.data)
            .then(async (acc) => {
              res = acc.dataValues;
            })
            .catch((err) => {
              console.log(err.message);
              if (err.name == "SequelizeUniqueConstraintError") {
                res = master.ALREADY_EXIST;
              } else {
                res = master.DATABASE_FAILURE;
              }
            });
          next(res);
        } else {
          console.log("===Error Server", response.data);
          next(master.SERVER_ERROR);
        }
      }
    )
    .catch((err) => {
      console.log(err);
    });
}
//#endregion

//#region Get List of all Accounts
async function getAllAccounts(next) {
  let res;
  await user
    .findAll()
    .then(async (acc) => {
      res = acc;
    })
    .catch((err) => {
      console.log(err.message);
      res = master.DATABASE_FAILURE;
    });
  next(res);
}
//#endregion

//#region Delete Complete Account
async function deletedAccount(data, next) {
  await user
    .destroy({
      where: {
        guid: data.guid,
      },
    })
    .then(async (sm) => {
      next(sm);
    })
    .catch((err) => {
      console.log(err.message);
      next(master.DATABASE_FAILURE);
    });
}
//#endregion

//#region Update Account Details Profile
async function updateAccount(data, next) {
  let res;
  await user
    .update(data, {
      where: {
        guid: data.guid,
      },
      returning: true,
    })
    .then(async (accd) => {
      res = accd[1][0].dataValues;
    })
    .catch((err) => {
      console.log(err.message);
      res = master.DATABASE_FAILURE;
    });
  next(res);
}
//#endregion
