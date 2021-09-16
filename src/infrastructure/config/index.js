const env = process.env.NODE_ENV;

console.log(process.env.PORT);
console.log(process.env.NODE_ENV);
const run = {
  server: {
    port: process.env.PORT || 3000,
    host: `https://localhost:/${process.env.PORT}`,
  },
};

const test = {
  server: {
    port: process.env.PORT || 3000,
    host: `https://localhost:/${process.env.PORT}`,
  },
};

const config = {
  run,
  test,
};

module.exports = config[env];
