"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoResolver = void 0;
const Todo_1 = require("../entities/Todo");
const type_graphql_1 = require("type-graphql");
const object_id_scalar_1 = require("../object-id.scalar");
const mongodb_1 = require("mongodb");
let TodoResolver = class TodoResolver {
    addTodo(todoName) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = new Todo_1.TodoModel({
                name: todoName,
            });
            yield todo.save();
            return todo;
        });
    }
    todos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Todo_1.TodoModel.find({});
        });
    }
    todo(todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Todo_1.TodoModel.findOne({ _id: todoId });
        });
    }
    updateTodo(todoId, todoName) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield Todo_1.TodoModel.findOne({ _id: todoId });
            todo.name = todoName;
            todo.updatedAt = new Date();
            yield todo.save();
            return todo;
        });
    }
    deleteTodo(todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Todo_1.TodoModel.deleteOne({ _id: todoId });
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Todo_1.Todo),
    __param(0, type_graphql_1.Arg("todoName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "addTodo", null);
__decorate([
    type_graphql_1.Query(() => [Todo_1.Todo]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "todos", null);
__decorate([
    type_graphql_1.Query(() => Todo_1.Todo),
    __param(0, type_graphql_1.Arg("todoId", () => object_id_scalar_1.ObjectIdScalar)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongodb_1.ObjectId]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "todo", null);
__decorate([
    type_graphql_1.Mutation(() => Todo_1.Todo),
    __param(0, type_graphql_1.Arg("todoId", () => object_id_scalar_1.ObjectIdScalar)),
    __param(1, type_graphql_1.Arg("todoName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongodb_1.ObjectId, String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "updateTodo", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("todoId", () => object_id_scalar_1.ObjectIdScalar)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongodb_1.ObjectId]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "deleteTodo", null);
TodoResolver = __decorate([
    type_graphql_1.Resolver()
], TodoResolver);
exports.TodoResolver = TodoResolver;
//# sourceMappingURL=todo.js.map