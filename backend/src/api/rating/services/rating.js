"use strict";

/**
 * rating service
 */

const { createCoreService } = require("@strapi/strapi").factories;
module.exports = createCoreService("api::rating.rating", ({ strapi }) => ({
  /*  async updateProductAverageRating(productId) {
    const product = await strapi.entityService.findOne(
      "api::product.product",
      productId,
      {
        fields: ["ratings"],
      }
    );
    if (!product || !product.ratings || product.ratings.length === 0) {
      return;
    }

    const totalRatings = product.ratings.length;
    const totalRatingValue = product.ratings.reduce(
      (acc, rating) => acc + rating.value,
      0
    );
    const averageRating = totalRatingValue / totalRatings;

    const entry = await strapi.entityService.update(
      "api::product.product",
      productId,
      { data: { overall_rating: averageRating } }
    );
  }, */
}));
