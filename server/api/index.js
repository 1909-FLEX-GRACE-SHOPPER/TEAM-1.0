const apiRouter = require("express").Router();

// API ROUTES

apiRouter.use("/items", require("./items"));
apiRouter.use("/users", require("./users"));
apiRouter.use("/orders", require("./orders"));
apiRouter.use("/sessions", require("./sessions"));
apiRouter.use("/cart-items", require("./cartItems"));
apiRouter.use("/payment", require("./payment"));
apiRouter.use("/", require("./oAuths"));

apiRouter.use((req, res, next) => {
  const err = new Error("API route not found");
  console.error(err);
  err.status = 404;
  next(err);
});

module.exports = apiRouter;
