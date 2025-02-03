const request = require("supertest");
const app = require("../index");

describe("FAQ API Tests", () => {
  it("should fetch FAQs in default language", async () => {
    const res = await request(app).get("/api/v1/faqs/");
    expect(res.statusCode).toBe(200);
  });

  it("should add a new FAQ", async () => {
    const res = await request(app).post("/api/v1/faqs/").send({
      question: "What is Node.js?",
      answer: "It is a runtime environment.",
    });

    expect(res.statusCode).toBe(201);
  });
});
