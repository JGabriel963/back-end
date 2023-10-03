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

// src/services/task/task-service.ts
var task_service_exports = {};
__export(task_service_exports, {
  TaskService: () => TaskService
});
module.exports = __toCommonJS(task_service_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TaskService
});
