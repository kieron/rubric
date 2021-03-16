var config = {
  API_URL:
    process.env.NODE_ENV === "production"
      ? process.env.VUE_APP_LIVE_API_URL
      : process.env.VUE_APP_DEV_API_URL,
  STRIPE_PUBKEY: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
};
module.exports = config;
