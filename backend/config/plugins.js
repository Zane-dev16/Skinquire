const armor = require("@escape.tech/graphql-armor");
const ApolloArmor = new armor.ApolloArmor({
  maxDepth: {
    n: 10,
  },
});
const { maxDepthPlugin } = require("@escape.tech/graphql-armor-max-depth");

module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "7d",
      },
    },
  },
  graphql: {
    enabled: true,
    config: {
      playgroundAlways: true,
      defaultLimit: 10,
      depthLimit: 10,
      maxLimit: 20,
      generateArtifacts: false,
      apolloServer: {
        ...ApolloArmor.protect(),
      },
    },
  },
});
