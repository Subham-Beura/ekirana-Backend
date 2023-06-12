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
    //Test if getting array of Products
    it("Get array of Products", async () => {
      const res = await request(app).get("/products");

      expect(res.body.data).toBeInstanceOf(Array);
      // data[0] to be of type Product
      expect(res.body.data[0]).toHaveProperty("p_id");
      expect(res.body.data[0]).toHaveProperty("name");
      expect(res.body.data[0]).toHaveProperty("desc");
    });
  });

  describe("POST /products : Create a new Product", () => {
    it("succesfully creates a new product with staus 201", async () => {
      // const res = await request(app)
      //   .post("/products")
      //   .send({
      //     p_id: returnRandomString(10),
      //     name: "test",
      //     desc: "test",
      //     price: 100,
      //     category: "test",
      //   });
      // expect(res.status).toBe(201);
      // expect(res.body.data.name).toBe("test");
    });
  });

  describe("PUT /products/:id : Update a Product", () => {});
  describe("DELETE /products/:id : Delete a Product", () => {});
  describe("GET /products/:id : Get a Product", () => {});
});
