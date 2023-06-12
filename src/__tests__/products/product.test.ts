import request from "supertest";
import app from "../../app";

describe("Test the Product Path", () => {
  describe("GET /products : Get all Products", () => {
    it("Get 200 Status code on success", async () => {
      const res = await request(app).get("/products");
      expect(res.header["content-type"]).toMatch(/json/);
      expect(res.status).toBe(200);
    });
  });
});
