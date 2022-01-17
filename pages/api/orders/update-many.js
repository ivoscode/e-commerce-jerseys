import nc from "next-connect";
import Order from "../../../models/Order";
import db from "../../../utils/db";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  console.log("body is", req.body);
  req.body.orders.forEach((order) => {
    console.log(order._id);
    Order.findByIdAndUpdate(order._id, req.body.data);
  });

  const orderlist = await Order.find();

  if (orderlist) {
    res.send(orderlist);
  } else {
    res.send({
      message: "No update on order",
    });
  }
});

export default handler;
