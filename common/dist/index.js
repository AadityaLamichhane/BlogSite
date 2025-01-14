"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElement = exports.updatePostInput = exports.createPostInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string(),
    name: zod_1.default.string().optional(),
});
exports.signinInput = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
exports.createPostInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    userId: zod_1.default.string()
});
exports.updatePostInput = zod_1.default.object({
    title: zod_1.default.string().optional(),
    content: zod_1.default.string().optional(),
    userId: zod_1.default.string(),
    id: zod_1.default.number()
});
exports.getElement = zod_1.default.object({
    id: zod_1.default.number(),
    authorId: zod_1.default.number(),
    content: zod_1.default.string(),
    authorname: zod_1.default.string().optional(),
    title: zod_1.default.string()
});
