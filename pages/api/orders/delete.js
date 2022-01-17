import nc from "next-connect";
import Order from "../../../models/Order";
import db from "../../../utils/db";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  console.log("delete an order api body", req.body);

  Order.findByIdAndDelete(req.body.id, function (err) {
    if (err) console.log("loggin errror", err);
    console.log("Successful deletion");
  });
  res.send({
    message: "order deleted",
  });
});

export default handler;
