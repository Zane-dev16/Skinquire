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
        fields: ["id"],
        populate: {
          ratings: {
            fields: ["rating"],
          },
        },
      }
    );
    console.log(product);
    if (!product || !product.ratings) {
      console.log("Error: not found");
      return;
    }
    const totalRatings = product.ratings.length;
    const totalRatingValue = product.ratings.reduce(
      (acc, rating) => acc + rating.rating,
      0
    );
    const averageRating = totalRatingValue / totalRatings;

    const entry = await strapi.entityService.update(
      "api::product.product",
      productId,
      { data: { overall_rating: averageRating } }
    );
  },
});
