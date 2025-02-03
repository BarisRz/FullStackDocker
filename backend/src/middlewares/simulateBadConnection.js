const simulateBadConnection = (req, res, next) => {
  setTimeout(() => {
    next();
  }, 2000);
};
module.exports = { simulateBadConnection };
// Explanation: This middleware is used to simulate a bad connection. It adds a delay of 5 seconds before calling the next middleware in the chain. This can be useful for testing how the application behaves under slow network conditions.
