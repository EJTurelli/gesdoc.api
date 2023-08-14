const yup = require("yup");

const loginSchema = yup.object({
  body: yup.object({
    cuil: yup.string().min(11).max(11).required(),
    password: yup.string().min(6).max(32).required(),
  })
});

const validateLogin = () => async (req, res, next) => {
  try {
    await loginSchema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err) {
      return res.status(500).json({ type: err.name, message: err.message });
  }
};

module.exports = validateLogin;
  