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
    if (!product || !product.ratings) {
      console.log("Error: not found");
      return;
    }
    const totalRatings = product.ratings.length;
    const totalRatingValue = product.ratings.reduce(
      (acc, rating) => acc + rating.rating,
      0
    );
    console.log(totalRatingValue);
    const averageRating = totalRatingValue / totalRatings;
    console.log(averageRating);

    const entry = await strapi.entityService.update(
      "api::product.product",
      productId,
      { data: { overall_rating: averageRating } }
    );
  },
});
