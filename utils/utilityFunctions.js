import fs from "fs/promises";

const __dirname = process.cwd();

async function fileExists(path) {
  try {
    await fs.access(path, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

export async function readUsers() {
  if (!(await fileExists(__dirname + "/data/users.json"))) {
    return [];
  }
  try {
    const data = await fs.readFile(__dirname + "/data/users.json", "utf8");

    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function writeUsers(users) {
  await fs.writeFile(
    __dirname + "/data/users.json",
    JSON.stringify(users, null, 2),
    "utf8"
  );
}

export async function readEvents() {
  try {
    if (!(await fileExists(__dirname + "/data/events.json"))) {
      return [];
    } else {
      const data = await fs.readFile(__dirname + "/data/events.json", "utf8");

      return JSON.parse(data);
    }
  } catch (error) {
    return [];
  }
}

export async function writeEvents(events) {
  await fs.writeFile(
    __dirname + "/data/events.json",
    JSON.stringify(events, null, 2),
    "utf8"
  );
}


export async function readReceipts() {
  try {
    if (!(await fileExists(__dirname + "/data/receipts.json"))) {
      return [];
    } else {
      const data = await fs.readFile(__dirname + "/data/receipts.json", "utf8");

      return JSON.parse(data);
    }
  } catch (error) {
    return [];
  }
}

export async function writeReceipts(receipts) {
  await fs.writeFile(
    __dirname + "/data/receipts.json",
    JSON.stringify(receipts, null, 2),
    "utf8"
  );
}