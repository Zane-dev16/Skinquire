module.exports = [
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true, // Keep this if applicable
        directives: {
          "connect-src": ["'self'", "https:"], // Allow connections to the same origin and HTTPS
          "img-src": [
            "https://skinquire-bucket.s3.amazonaws.com",

            "'self'",
            "data:",
            "skinquire-bucket.s3.us-east-1.amazonaws.com",
            "blob:",
            "dl.airtable.com",
          ],
          "media-src": [
            "skinquire-bucket.s3.us-east-1.amazonaws.com",
            "https://skinquire-bucket.s3.amazonaws.com/",
            "'self'",
            "data:",
            "blob:",
            "dl.airtable.com",
          ],
          upgradeInsecureRequests: null,
          "frame-src": "'self'", // Allow framing from the same origin
        },
      },
      xssFilter: true, // Enable XSS protection
      hsts: {
        maxAge: 31536000, // Set HSTS max age to one year
        includeSubDomains: true, // Apply HSTS to all subdomains
      },
      frameguard: {
        action: "sameorigin", // Set X-Frame-Options to sameorigin
      },
    },
  },
  "strapi::cors",
  {
    name: "strapi::cors",
    config: {
      origin: [process.env.APP_URL, process.env.STRAPI_PUBLIC_FRONTEND_URL],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
      headers: ["Content-Type", "Authorization"],
      keepHeaderOnError: true,
    },
  },
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
