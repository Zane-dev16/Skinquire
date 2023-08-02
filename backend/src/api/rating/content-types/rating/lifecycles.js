const product = require("../../../product/controllers/product");

module.exports = {
  beforeCreate(event) {
    event.params.populate = { product: { select: "id" } };
  },
  afterCreate(event) {
    strapi
      .service("api::rating.update-product-rating")
      .updateProductAverageRating(event.result.product.id);
  },

  beforeUpdate(event) {
    event.params.populate = { product: { select: "id" } };
  },
  afterUpdate(event) {
    strapi
      .service("api::rating.update-product-rating")
      .updateProductAverageRating(event.result.product.id);
  },

  beforeDelete(event) {
    event.params.populate = { product: { select: "id" } };
  },
  afterDelete(event) {
    strapi
      .service("api::rating.update-product-rating")
      .updateProductAverageRating(event.result.product.id);
  },
};
