const signupHandler = (req, res) => {
  res.status(200).json({
    message: "Successfully signedup",
  });
};

const loginHandler = (req, res) => {
  res.status(200).json({
    message: "Successfully lopggedin...",
  });
};

module.exports = { loginHandler, signupHandler };
