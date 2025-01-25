import { createRouter } from "next-connect";
import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";
import controller from "infra/controller.js";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function runMigrations(dryRun = true) {
  let dbClient;

  try {
    dbClient = await database.getNewClient();
    return await migrationRunner({
      dbClient,
      dryRun,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    });
  } finally {
    dbClient?.end();
  }
}

async function getHandler(request, response) {
  const pendingMigrations = await runMigrations();

  response.status(200).json(pendingMigrations);
}

async function postHandler(request, response) {
  const migratedMigrations = await runMigrations(false);

  if (migratedMigrations.length > 0) {
    return response.status(201).json(migratedMigrations);
  }

  response.status(200).json(migratedMigrations);
}
