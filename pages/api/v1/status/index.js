import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const postgresVersion = await getPostgresVersion();
  const maxConnections = await getMaxConnections();
  const usedConnections = await getUsedConnections();

  response.status(200).json({
    updated_at: updatedAt,
    postgres_version: postgresVersion,
    max_connections: maxConnections,
    used_connections: usedConnections,
  });
}

async function getPostgresVersion() {
  const result = await database.query("SELECT version()");
  const version = await result.rows[0].version;
  return version;
}

async function getMaxConnections() {
  const result = await database.query("SHOW max_connections");
  const maxConnections = await result.rows[0].max_connections;
  return maxConnections;
}

async function getUsedConnections() {
  const result = await database.query("SELECT COUNT(*) FROM pg_stat_activity");
  const usedConnections = await result.rows[0].count;
  return usedConnections;
}

export default status;
