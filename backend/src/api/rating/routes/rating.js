"use strict";

/**
 * rating router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::rating.rating", {
  except: ["create", "update", "delete"],
  config: {},
});
