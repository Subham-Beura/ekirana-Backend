import request from "supertest";
import app from "../../app";
import { returnRandomString } from "../../utlis/returnRandomString";
describe("Test the Product Path", () => {
  describe("GET /products : Get all Products", () => {
    it("Get 200 Status code on success", async () => {
      const res = await request(app).get("/products");
      expect(res.header["content-type"]).toMatch(/json/);
      expect(res.status).toBe(200);
    });
  });

  describe("POST /products : Create a new Product", () => {
    it("succesfully creates a new product with staus 201", async () => {
      const res = await request(app)
        .post("/products")
        .send({
          p_id: returnRandomString(10),
          name: "test",
          desc: "test",
          price: 100,
          category: "test",
        });
      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe("test");
    });
  });
});
