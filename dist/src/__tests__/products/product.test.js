"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const returnRandomString_1 = require("../../../utlis/returnRandomString");
beforeAll(() => {
    jest.setTimeout(60000);
});
describe("Test the Product Path", () => {
    describe("GET /products : Get all Products", () => {
        it("Get 200 Status code on success", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default).get("/products");
            expect(res.header["content-type"]).toMatch(/json/);
            expect(res.status).toBe(200);
        }));
    });
    describe("POST /products : Create a new Product", () => {
        it("returns 201 status code on success", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default)
                .post("/products")
                .send({
                p_id: (0, returnRandomString_1.returnRandomString)(10),
                name: "test",
                desc: "test",
                price: 100,
                category: "test",
            });
            expect(res.status).toBe(201);
        }));
        it("succesfully creates a new product", () => __awaiter(void 0, void 0, void 0, function* () { }));
    });
});
