import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedUpdatAt = new Date(responseBody.update_at).toISOString();
  //Se o valor que chegar em update_at for diferente do parsedUpdateAt, o teste dá erro
  expect(responseBody.update_at).toEqual(parsedUpdatAt);
  expect(responseBody.dependecies.database.version).toEqual("16.13");
  expect(responseBody.dependecies.database.max_connections).toEqual(100);
  expect(responseBody.dependecies.database.opned_connections).toEqual(1);
});
