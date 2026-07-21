const request = require("supertest");

const app = require("../src/app");
const pool = require("../src/config/database");

describe("GET /api/health", () => {
  afterAll(async () => {
    await pool.end();
  });

  it("informa que la API y PostgreSQL están disponibles", async () => {
    const response = await request(app)
      .get("/api/health")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.status).toBe("ok");
    expect(response.body.database).toBe("connected");
    expect(response.body.application).toBe("TaskContainer API");
  });
});
