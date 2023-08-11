module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    event.params.data.rating = event.params.data.base_rating;
  },
};
