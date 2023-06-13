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
const returnRandomString_1 = require("../../utlis/returnRandomString");
describe("Test the Product Path", () => {
    describe("GET /products : Get all Products", () => {
        it("Get 200 Status code on success", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default).get("/products");
            expect(res.header["content-type"]).toMatch(/json/);
            expect(res.status).toBe(200);
        }));
        //Test if getting array of Products
        it("Get array of Products", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default).get("/products");
            expect(res.body.data).toBeInstanceOf(Array);
            // data[0] to be of type Product
            expect(res.body.data[0]).toHaveProperty("p_id");
            expect(res.body.data[0]).toHaveProperty("name");
            expect(res.body.data[0]).toHaveProperty("desc");
        }));
    });
    describe("GET /products/:id : Get a Product", () => {
        it("Get user on Success", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default).get("/products/tester1");
            expect(res.header["content-type"]).toMatch(/json/);
            expect(res.status).toBe(200);
            expect(res.body.data).toHaveProperty("p_id");
        }));
        it("Get 404 on User not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default).get("/products/p_id_not_found");
            expect(res.header["content-type"]).toMatch(/json/);
            expect(res.status).toBe(404);
        }));
    });
    describe("POST /products : Create a new Product", () => {
        it("succesfully creates a new product with staus 201", () => __awaiter(void 0, void 0, void 0, function* () {
            const newProduct = {
                p_id: (0, returnRandomString_1.returnRandomString)(10),
                name: "test",
                desc: "test",
                price: 100,
                category: "test",
                seller: "owner",
                colors: ["red", "black"],
                stock: 100,
            };
            const res = yield (0, supertest_1.default)(app_1.default).post("/products").send(newProduct);
            expect(res.status).toBe(201);
            expect(res.body.data.name).toBe("test");
            // Delete the new Document
            const deleteRes = yield (0, supertest_1.default)(app_1.default).delete(`/products/${res.body.data.p_id}`);
            expect(deleteRes.status).toBe(200);
        }));
    });
    describe("PUT /products/:id : Update a Product", () => {
        // it should return 200 on success
        it("succesfully updates a product with staus 200", () => __awaiter(void 0, void 0, void 0, function* () {
            let newObject = { desc: (0, returnRandomString_1.returnRandomString)(10) };
            const res = yield (0, supertest_1.default)(app_1.default).put("/products/tester1").send(newObject);
            expect(res.status).toBe(200);
            expect(res.header["content-type"]).toMatch(/json/);
            expect(res.body.data.desc).toBe(newObject.desc);
        }));
        it("shoudl return 404 on product not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default).put("/products/p_id_not_found").send({});
            expect(res.status).toBe(404);
            expect(res.header["content-type"]).toMatch(/json/);
        }));
    });
    describe("DELETE /products/:id : Delete a Product", () => {
        it("should return 200 on successful deletion", () => __awaiter(void 0, void 0, void 0, function* () {
            const newProduct = {
                p_id: (0, returnRandomString_1.returnRandomString)(10),
                name: "test",
                desc: "test",
                price: 100,
                category: "test",
                seller: "owner",
                colors: ["red", "black"],
                stock: 100,
            };
            // Create a new Product
            const res = yield (0, supertest_1.default)(app_1.default).post("/products").send(newProduct);
            // Delete said Product
            const deleteRes = yield (0, supertest_1.default)(app_1.default).delete(`/products/${newProduct.p_id}`);
            // Get said Product to check if it was deleted
            const getRes = yield (0, supertest_1.default)(app_1.default).get(`/products/${newProduct.p_id}`);
            expect(res.status).toBe(201);
            expect(deleteRes.status).toBe(200);
            expect(deleteRes.header["content-type"]).toMatch(/json/);
            expect(getRes.status).toBe(404);
        }));
        it("should return 404 on product not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default).delete(`/products/p_id_not_found`);
            expect(res.status).toBe(404);
            expect(res.header["content-type"]).toMatch(/json/);
        }));
    });
});
