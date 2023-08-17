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
          "img-src": ["'self'", "data:"],
          "media-src": ["'self'", "data:"],
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
      origin: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:1337",
        "http://localhost:1337",
        process.env.APP_URL,
      ],
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
