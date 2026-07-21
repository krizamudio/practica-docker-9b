const request = require("supertest");

const app = require("../src/app");
const pool = require("../src/config/database");

let createdActivityId;

describe("API de actividades", () => {
  afterAll(async () => {
    if (createdActivityId) {
      await pool.query(
        "DELETE FROM activities WHERE id = $1",
        [createdActivityId]
      );
    }

    await pool.end();
  });

  it("registra una actividad", async () => {
    const activity = {
      title: "Actividad generada por Vitest",
      subject: "Desarrollo Web Integral",
      dueDate: "2026-08-10",
      priority: "media",
      status: "pendiente",
    };

    const response = await request(app)
      .post("/api/activities")
      .send(activity)
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body.status).toBe("ok");
    expect(response.body.data.title).toBe(activity.title);

    createdActivityId = response.body.data.id;
  });

  it("consulta la actividad registrada", async () => {
    expect(createdActivityId).toBeDefined();

    const response = await request(app)
      .get(`/api/activities/${createdActivityId}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.data.id).toBe(createdActivityId);
    expect(response.body.data.status).toBe("pendiente");
  });

  it("cambia el estado de la actividad", async () => {
    const response = await request(app)
      .patch(`/api/activities/${createdActivityId}/status`)
      .send({
        status: "terminada",
      })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.data.status).toBe("terminada");
  });

  it("rechaza una actividad con información inválida", async () => {
    const response = await request(app)
      .post("/api/activities")
      .send({
        title: "",
        subject: "",
        priority: "urgente",
        status: "finalizada",
      })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body.status).toBe("error");
    expect(Array.isArray(response.body.errors)).toBe(true);
  });
});
