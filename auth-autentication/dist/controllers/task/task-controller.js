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

// src/controllers/task/task-controller.ts
var task_controller_exports = {};
__export(task_controller_exports, {
  TaskController: () => TaskController
});
module.exports = __toCommonJS(task_controller_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TaskController
});
