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
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        s3Options: {
          accessKeyId: env("AWS_ACCESS_KEY_ID"),
          secretAccessKey: env("AWS_ACCESS_SECRET"),
          region: env("AWS_REGION"),
          params: {
            ACL: env("AWS_ACL", "public-read"),
            signedUrlExpires: env("AWS_SIGNED_URL_EXPIRES", 15 * 60),
            Bucket: env("AWS_BUCKET"),
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
