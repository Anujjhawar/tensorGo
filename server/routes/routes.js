const { Router } = require("express");
const router = new Router();

import addAccount from "../controllers/User/addAccount.controller";
router.post("/user", addAccount);

import updateAccount from "../controllers/User/updateAccount.controller";
router.put("/user", updateAccount);

import deleteAccount from "../controllers/User/deleteAccount.controller";
router.delete("/user", deleteAccount);

import getAllAccounts from "../controllers/User/getAllAccounts.controller";
router.get("/user", getAllAccounts);

module.exports = router;
