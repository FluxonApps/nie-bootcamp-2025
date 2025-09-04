const onboardingController = require("../controllers/onboardingController.js");

const base = "/api/onboarding";

const onboardingRoutes = [
  {
    method: "POST",
    url: base,
    handler: onboardingController.saveDetails,
  },
];

module.exports = onboardingRoutes;
