// to verify user with firebase
// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json");

import admin from "firebase-admin";
// import serviceAccount from "./serviceAccountKey" with { type: "json" };
// import serviceAccount from "./flashcard-saas-serviceAccountKey.js";
// import * as serviceAccount from "./serviceAccountKey.js";

if (!admin.apps.length) {
  admin.initializeApp({
    // credential: admin.credential.cert(serviceAccount)
    credential: admin.credential.cert({
      "type": process.env.FIREBASE_ADMIN_TYPE,
      "project_id": process.env.FIREBASE_ADMIN_PROJECT_ID,
      "private_key_id": process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
      "private_key": process.env.FIREBASE_ADMIN_PRIVATE_KEY,
      // "private_key": process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
      "client_email": process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      "client_id": process.env.FIREBASE_ADMIN_CLIENT_ID,
      "auth_uri": process.env.FIREBASE_ADMIN_AUTH_URI,
      "token_uri": process.env.FIREBASE_ADMIN_TOKEN_URI,
      "auth_provider_x509_cert_url": process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
      "client_x509_cert_url": process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
      "universe_domain": process.env.FIREBASE_ADMIN_UNIVERSE_DOMAIN
    })
  });
}

export default admin