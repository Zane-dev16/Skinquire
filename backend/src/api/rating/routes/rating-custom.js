module.exports = {
  routes: [
    {
      method: "POST",
      path: "/graphql",
      handler: "rating.create",
      config: {
        /**
            The `is-admin` policy found at `./src/api/restaurant/policies/is-admin.js`
            is executed before the `find` action in the `Restaurant.js` controller.
           */
        policies: ["prevent-double-rating"],
      },
    },
  ],
};
