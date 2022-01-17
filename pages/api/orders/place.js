import nc from "next-connect";
import Order from "../../../models/Order";
import db from "../../../utils/db";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const newOrder = new Order({
    ...req.body,
  });
  const order = await newOrder.save();

  if (order) {
    res.status(201).send(order);
  } else {
    res.send({
      message: "No orders placed",
    });
  }
});

export default handler;
