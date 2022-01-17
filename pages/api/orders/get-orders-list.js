import nc from "next-connect";
import Order from "../../../models/Order";
import db from "../../../utils/db";
const handler = nc();

handler.get(async (req, res) => {
  await db.connect();

  const orderlist = await Order.find();

  if (orderlist) {
    // console.log("order list", orderlist);
    res.send(orderlist);
  } else {
    res.send({
      message: "No orders available",
    });
  }
});

export default handler;
