import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public");
});

describe("POST /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const res1 = await fetch("http://localhost:3000/api/v1/migrations", {
          method: "POST",
        });
        expect(res1.status).toBe(201);

        const responseBody = await res1.json();

        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody.length).toBeGreaterThan(0);
      });

      test("For the second time", async () => {
        const res2 = await fetch("http://localhost:3000/api/v1/migrations", {
          method: "POST",
        });

        const getBody = await res2.json();
        expect(getBody.length).toBe(0);
        expect(res2.status).toBe(200);
      });
    });
  });
});
