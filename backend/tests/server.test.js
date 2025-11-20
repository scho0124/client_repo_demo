import request from "supertest";
import app from "../server.js";

describe("Backend API tests", () => {
  it("GET / should return API running message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("API running 🚀");
  });
});
