module.exports = {
  ROLES: ["donor", "recipient", "admin"],
  DONATION_STATUS: {
    ACTIVE: "active",
    FULFILLED: "fulfilled",
    CANCELLED: "cancelled",
  },
  REQUEST_STATUS: {
    PENDING: "pending",
    APPROVED: "approved",
    REJECTED: "rejected",
    COMPLETED: "completed",
  },
  JWT_SECRET : process.env.JWT_SECRET || "supersecretkey"
};
