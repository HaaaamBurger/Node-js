const path = require("path");
const fs = require("fs/promises");

const dbPath = path.join(process.cwd(), "db.json");
const reader = async () => {
  const json = await fs.readFile(dbPath, { encoding: "utf-8" });
  return JSON.parse(json);
};

const writer = async (users) => {
  await fs.writeFile(dbPath, JSON.stringify(users));
};

module.exports = {
  reader,
  writer,
};
