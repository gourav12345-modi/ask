module.exports = (error, req, res, next) => {
  console.error(error.stack); 
  if (error.name === "ValidationError") {
    let errors = {};

    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });

    return res.status(400).send(errors);
  }
  return res.status(500).json({ message: 'Internal server error.' });
};
