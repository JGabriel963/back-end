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

// src/router.ts
var router_exports = {};
__export(router_exports, {
  router: () => router
});
module.exports = __toCommonJS(router_exports);
var import_express = require("express");

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

// src/services/user/auth-user-service.ts
var import_bcryptjs2 = require("bcryptjs");
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
    const passwordMatch = yield (0, import_bcryptjs2.compare)(password, user.password);
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

// src/controllers/user/auth-user-controller.ts
var AuthUserController = {
  handle: (req, res) => __async(void 0, null, function* () {
    const { email, password } = req.body;
    if (email === "" || password === "") {
      throw new Error("Fields Missing");
    }
    const auth = yield AuhtUserService.execute({
      email,
      password
    });
    return res.json(auth);
  })
};

// src/middlewares/is-authenticated.ts
var import_jsonwebtoken2 = require("jsonwebtoken");
function isAutenticated(req, res, next) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).send("Not authorized");
  }
  const [, token] = authToken.split(" ");
  try {
    const { sub } = (0, import_jsonwebtoken2.verify)(
      token,
      "88f7cf0aea467d203716101fc5f12f1e"
    );
    req.user_id = sub;
    return next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

// src/services/user/me-user-service.ts
var DetailUserService = {
  execute: (user_id) => __async(void 0, null, function* () {
    const user = yield prisma_default.user.findFirst({
      where: {
        id: user_id
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

// src/controllers/user/me-user-controller.ts
var DetailUserController = {
  handle: (req, res) => __async(void 0, null, function* () {
    const user_id = req.user_id;
    const user = yield DetailUserService.execute(user_id);
    return res.json(user);
  })
};

// src/services/task/task-service.ts
var TaskService = {
  create: (_0) => __async(void 0, [_0], function* ({ description, done, user_id }) {
    const task = yield prisma_default.task.create({
      data: {
        description,
        done,
        user_id
      }
    });
    return task;
  }),
  findAll: (id) => __async(void 0, null, function* () {
    const tasks = yield prisma_default.task.findMany({
      where: {
        user_id: id
      }
    });
    return tasks;
  }),
  checkTask: (_0) => __async(void 0, [_0], function* ({ description, done, id }) {
    const task = yield prisma_default.task.update({
      where: {
        id
      },
      data: {
        description,
        done
      }
    });
    return task;
  }),
  deletTask: (id) => __async(void 0, null, function* () {
    const task = yield prisma_default.task.delete({
      where: {
        id
      }
    });
    return task;
  })
};

// src/controllers/task/task-controller.ts
var TaskController = {
  create: (req, res) => __async(void 0, null, function* () {
    const { description, done } = req.body;
    const user_id = req.user_id;
    const task = yield TaskService.create({
      description,
      done,
      user_id
    });
    return res.status(201).json(task);
  }),
  findAll: (req, res) => __async(void 0, null, function* () {
    const id = req.user_id;
    const tasks = yield TaskService.findAll(id);
    return res.json(tasks);
  }),
  update: (req, res) => __async(void 0, null, function* () {
    const { description, done } = req.body;
    const { id } = req.params;
    const task = yield TaskService.checkTask({
      description,
      done,
      id
    });
    return res.json(task);
  }),
  delete: (req, res) => __async(void 0, null, function* () {
    const { id } = req.params;
    const task = yield TaskService.deletTask(id);
    return res.json(task);
  })
};

// src/router.ts
var router = (0, import_express.Router)();
router.post("/signup", CreateUserController.hanlde);
router.post("/signin", AuthUserController.handle);
router.post("/me", isAutenticated, DetailUserController.handle);
router.post("/tasks", isAutenticated, TaskController.create);
router.get("/tasks", isAutenticated, TaskController.findAll);
router.put("/tasks/:id", isAutenticated, TaskController.update);
router.delete("/tasks/:id", isAutenticated, TaskController.delete);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
