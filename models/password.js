import bcryptjs from "bcryptjs";

async function hash(password) {
  console.log(process.env.PEPPER);
  const rounds = getNumbersOfRounds();
  const spicyPassword = pepperPassword(password);

  return await bcryptjs.hash(spicyPassword, rounds);
}

function getNumbersOfRounds() {
  return process.env.NODE_ENV === "production" ? 14 : 1;
}

function pepperPassword(password) {
  const pepper = process.env.PEPPER || "";

  return password + pepper;
}

async function compare(providedPassword, storedPassword) {
  const spicyPassword = pepperPassword(providedPassword);

  return await bcryptjs.compare(spicyPassword, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;
