"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.plugin("graphql").service("extension");

    extensionService.use({
      resolversConfig: {
        "Mutation.createRating": {
          policies: [
            async (context) => {
              const { product, user } = context.args.data;
              const entries = await strapi.entityService.findMany(
                "api::rating.rating",
                {
                  filters: {
                    $and: [
                      {
                        product: {
                          id: 2,
                        },
                      },
                      {
                        user: {
                          id: 25,
                        },
                      },
                    ],
                  },
                }
              );
              if (entries.length == 0) {
                console.log("trusted");
                return true;
              }

              return false;
            },
          ],
          auth: true,
        },
      },
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
