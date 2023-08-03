"use strict";

/**
 * `preventDoubleRating` policy
 */

module.exports = (policyContext, config, { strapi }) => {
  strapi.log.info("success");
  return false;
};
