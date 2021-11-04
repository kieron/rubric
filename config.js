var config = {
  API_URL: process.env.VUE_APP_API_URL,
  STRIPE_PUBKEY: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
  JUSTSTART_PLAN: process.env.VUE_APP_JUSTSTART,
  PRO_PLAN: process.env.VUE_APP_PRO,
  AGENCY_PLAN: process.env.VUE_APP_AGENCY,
};
module.exports = config;
