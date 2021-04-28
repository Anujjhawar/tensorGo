const messageCodes = require('./messageCode');

require('dotenv').config();
const TOKEN_ADMIN_HEADER_KEY = "x-master-token";
const TOKEN_HEADER_KEY = "x-access-token";
const TOKEN_USER_HEADER_KEY = "x-user-token";

const userRoles = {
    USER: "USER",
    ADMIN: "ADMIN",
    SALOON: "ACCOUNT"
};
const loginType = {
    INVENTO: "INVENTO",
    FB: "FB",
    GOOGLE: "GOOGLE"
};
const devConfig = {
    JWT_SECRET: process.env.JWT_SECRET_DEV,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET_DEV,
    TOKEN_EXPIRE_IN: process.env.TOKEN_EXPIRE_IN,
    USER_TOKEN_EXPIR_IN: process.env.USER_TOKEN_EXPIRE_IN,
    REFRESH_TOKEN_EXPIRE_IN: process.env.REFRESH_TOKEN_EXPIRE_IN
};

const testConfig = {
    JWT_SECRET: process.env.JWT_SECRET_TEST,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET_TEST,
    TOKEN_EXPIRE_IN: process.env.TOKEN_EXPIRE_IN,
    USER_TOKEN_EXPIR_IN: process.env.USER_TOKEN_EXPIRE_IN,
    REFRESH_TOKEN_EXPIRE_IN: process.env.REFRESH_TOKEN_EXPIRE_IN
};

const prodConfig = {
    JWT_SECRET: process.env.JWT_SECRET_PROD,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET_PROD,
    TOKEN_EXPIRE_IN: process.env.TOKEN_EXPIRE_IN,
    USER_TOKEN_EXPIR_IN: process.env.USER_TOKEN_EXPIRE_IN,
    REFRESH_TOKEN_EXPIRE_IN: process.env.REFRESH_TOKEN_EXPIRE_IN
};

const defaultConfig = {
    URL: process.env.IMAGE_UPLOAD_URL,
    PORT: process.env.PORT || 3000,
    APP_URL: process.env.APP_URL || "localhost",
    APP_KEY: process.env.APP_KEY
};

const smtpConfig = {
    FROM: "PRODUCT NAME",
    HOST: process.env.SMTP_HOST,
    PORT: process.env.SMTP_PORT,
    SECURE: process.env.SMTP_SECURE,
    USERNAME: process.env.SMTP_USERNAME,
    PASSWORD: process.env.SMTP_PASSWORD
};

function envConfig(env) {
    switch (env) {
        case 'development':
            return devConfig;
        case 'test':
            return testConfig;
        default:
            return prodConfig;
    }
}

module.exports = {
    ...defaultConfig,
    ...envConfig(process.env.NODE_ENV),
    ...userRoles,
    ...messageCodes,
    SMTP: smtpConfig,
    TOKEN_HEADER_KEY,
    TOKEN_USER_HEADER_KEY,
    TOKEN_ADMIN_HEADER_KEY,
    ...loginType,
    appName: "Big Barber"
};