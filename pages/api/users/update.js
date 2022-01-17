import nc from "next-connect";
import User from "../../../models/User";
import db from "../../../utils/db";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  console.log("body", req.body);
  const updatedUser = await User.findByIdAndUpdate(req.query._id, req.body);
  const userlist = await User.find();

  if (userlist) {
    console.log(userlist);
    res.send(userlist);
  } else {
    res.send({
      message: "No update",
    });
  }
});

export default handler;
