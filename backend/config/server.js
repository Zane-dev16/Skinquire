module.exports = ({ env }) => ({
  host: env("APP_HOST", "localhost"),
  port: env.int("PORT", 1337),
  url: env("APP_URL", "http://localhost:1337"),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
});
