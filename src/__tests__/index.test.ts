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
  jest.setTimeout(60000);
  server = app.listen(4001);
});
afterAll(() => {
  server.close();
});
