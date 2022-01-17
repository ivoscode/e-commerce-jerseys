import nc from "next-connect";
import Order from "../../../models/Order";
import db from "../../../utils/db";
const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  //console.log("get orders by status", req.query);
  const orderlist = await Order.find({ status: req.query.status });

  if (orderlist) {
    console.log("order list", orderlist);
    res.send(orderlist);
  } else {
    res.send({
      message: "No orders available",
    });
  }
});

export default handler;
