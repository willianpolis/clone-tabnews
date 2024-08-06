test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  // Versão do postgres
  const expectedPostgresVersion =
    "PostgreSQL 16.0 on x86_64-pc-linux-musl, compiled by gcc (Alpine 12.2.1_git20220924-r10) 12.2.1 20220924, 64-bit";
  expect(responseBody.postgres_version).toBe(expectedPostgresVersion);

  // Maximo de Conexoes
  const mockMaxConnections = "100";
  expect(responseBody.max_connections).toBe(mockMaxConnections);

  // Conexoes em uso
  const mockConnectionsInUse = "5";
  //expect(responseBody.used_connections).toBe(mockConnectionsInUse);
});
