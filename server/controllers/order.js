exports.getOrders = (req, res, next) => {
  res.status(200).json({
    orders: [
      {
        title: "first title",
        content: "first content",
      },
    ],
  });
};
