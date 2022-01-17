import nc from "next-connect";
import Order from "../../../models/Order";
import db from "../../../utils/db";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  console.log("body", req.body);
  console.log(req.query._id);
  await Order.findByIdAndUpdate(req.query._id, req.body);
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
