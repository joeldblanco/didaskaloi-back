const catchAsync = (controller) => {
  return async (req, res, next) => {
    controller(req, res).catch((err) => next(err));
  };
};

module.exports = catchAsync;
