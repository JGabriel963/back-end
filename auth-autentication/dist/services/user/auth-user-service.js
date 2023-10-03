"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/services/user/auth-user-service.ts
var auth_user_service_exports = {};
__export(auth_user_service_exports, {
  AuhtUserService: () => AuhtUserService
});
module.exports = __toCommonJS(auth_user_service_exports);
var import_bcryptjs = require("bcryptjs");

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/user/auth-user-service.ts
var import_jsonwebtoken = require("jsonwebtoken");
var AuhtUserService = {
  execute: (_0) => __async(void 0, [_0], function* ({ email, password }) {
    const user = yield prisma_default.user.findFirst({
      where: {
        email
      }
    });
    if (!user) {
      throw new Error("User/password incorrect");
    }
    const passwordMatch = yield (0, import_bcryptjs.compare)(password, user.password);
    if (!passwordMatch) {
      throw new Error("Password incorrect");
    }
    const token = (0, import_jsonwebtoken.sign)(
      {
        name: user.name,
        email: user.email
      },
      "88f7cf0aea467d203716101fc5f12f1e",
      {
        subject: user.id,
        expiresIn: "10d"
      }
    );
    return {
      token
    };
  })
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuhtUserService
});
