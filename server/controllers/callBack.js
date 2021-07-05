exports.callback = async (req, res, next) => {
  console.log("CallBack Recieved");
  console.log(req.body);
  res.status(200).json({
    status: req.body.status,
  });
};
