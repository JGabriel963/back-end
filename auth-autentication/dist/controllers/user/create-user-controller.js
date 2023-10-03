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

// src/controllers/user/create-user-controller.ts
var create_user_controller_exports = {};
__export(create_user_controller_exports, {
  CreateUserController: () => CreateUserController
});
module.exports = __toCommonJS(create_user_controller_exports);

// src/services/user/create-user-service.ts
var import_bcryptjs = require("bcryptjs");

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/user/create-user-service.ts
var CreateUserService = {
  execute: (_0) => __async(void 0, [_0], function* ({ name, email, password }) {
    const userAlreadyExists = yield prisma_default.user.findFirst({
      where: {
        email
      }
    });
    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }
    const passwordHash = yield (0, import_bcryptjs.hash)(password, 8);
    const user = yield prisma_default.user.create({
      data: {
        name,
        email,
        password: passwordHash
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });
    return user;
  })
};

// src/controllers/user/create-user-controller.ts
var CreateUserController = {
  hanlde: (req, res) => __async(void 0, null, function* () {
    const { name, email, password } = req.body;
    if (name === "" || email === "" || password === "") {
      throw new Error("Missing Fields");
    }
    const user = yield CreateUserService.execute({
      name,
      email,
      password
    });
    return res.json(user);
  })
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateUserController
});
