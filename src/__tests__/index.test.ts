import request from "supertest";
import app from "../app";

describe("Hello World", () => {
  it("return status 200", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
  });
  it("return Hello World", async () => {
    const res = await request(app).get("/");
    expect(res.text).toEqual("Hello World");
  });
});

let server: any;
beforeAll(() => {
  server = app.listen(4001); // Random number is needed to avoid using same port in different tests if you run in parallel
});
afterAll(() => {
  server.close();
});
