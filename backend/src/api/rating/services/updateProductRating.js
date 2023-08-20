"use strict";

/**
 * updateProductRating service
 */

module.exports = () => ({
  async updateProductAverageRating(productId) {
    const product = await strapi.entityService.findOne(
      "api::product.product",
      productId,
      {
        fields: ["id", "base_rating"],
        populate: {
          ratings: {
            fields: ["rating"],
          },
        },
      }
    );
    if (!product || !product.ratings || !product.base_rating) {
      console.error("Error: product/rating not found");
      return;
    }

    const totalRatings = product.ratings.length;
    const totalRatingValue = product.ratings.reduce(
      (acc, rating) => acc + rating.rating,
      0
    );

    const averageUserRating = totalRatingValue / totalRatings;

    const baseRating = product.base_rating;
    const normalizedWeight = Math.min(totalRatings / 100, 1);

    const adjustedRating =
      (1 - normalizedWeight) * baseRating +
      normalizedWeight * averageUserRating;

    const entry = await strapi.entityService.update(
      "api::product.product",
      productId,
      { data: { rating: adjustedRating } }
    );
  },
});
