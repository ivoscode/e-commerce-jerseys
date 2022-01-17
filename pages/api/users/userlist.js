import nc from "next-connect";
import User from "../../../models/User";
import db from "../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();

  const userlist = await User.find();

  if (userlist) {
    res.send(userlist);
  } else {
    res.send({
      message: "No users available",
    });
  }
});

export default handler;
