import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("PUT /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("With the wrong HTTP method", async () => {
        const response = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "PUT",
          },
        );
        expect(response.status).toBe(405);

        const responseBody = await response.json();

        expect(responseBody).toEqual({
          name: "MethodNotAllowedError",
          message: "Método não permitido para este endpoint.",
          action:
            "Verifique se o método HTTP enviado é valido para este endpoint.",
          status_code: 405,
        });
      });
    });
  });
});
