import request from "supertest";
import app from "../../app";
import { returnRandomString } from "../../utlis/returnRandomString";
import Product from "../../types/ProductType";
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

  describe("GET /products/:id : Get a Product", () => {
    it("Get user on Success", async () => {
      const res = await request(app).get("/products/tester1");

      expect(res.header["content-type"]).toMatch(/json/);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty("p_id");
    });

    it("Get 404 on User not found", async () => {
      const res = await request(app).get("/products/p_id_not_found");

      expect(res.header["content-type"]).toMatch(/json/);
      expect(res.status).toBe(404);
    });
  });

  describe("POST /products : Create a new Product", () => {
    it("succesfully creates a new product with staus 201", async () => {
      //! Commneted as it would create a user every time tests are run
      // const res = await request(app)
      //   .post("/products")
      //   .send({
      //     p_id: returnRandomString(10),
      //     name: "test",
      //     desc: "test",
      //     price: 100,
      //     category: "test",
      //   });
      //
      // expect(res.status).toBe(201);
      // expect(res.body.data.name).toBe("test");
    });
  });

  describe("PUT /products/:id : Update a Product", () => {
    // it should return 200 on success
    it("succesfully updates a product with staus 200", async () => {
      let newObject = { desc: returnRandomString(10) };

      const res = await request(app).put("/products/tester1").send(newObject);

      expect(res.status).toBe(200);
      expect(res.header["content-type"]).toMatch(/json/);
      expect(res.body.data.desc).toBe(newObject.desc);
    });
    it("shoudl return 404 on product not found", async () => {
      const res = await request(app).put("/products/p_id_not_found").send({});

      expect(res.status).toBe(404);
      expect(res.header["content-type"]).toMatch(/json/);
    });
  });
  describe("DELETE /products/:id : Delete a Product", () => {});
});
