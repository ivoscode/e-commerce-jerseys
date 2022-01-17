import nc from "next-connect";
import User from "../../../models/User";
import db from "../../../utils/db";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ name: req.body.name });

  if (user) {
    //update to latest picture in db
    await User.findByIdAndUpdate(user._id, {
      profileImage: req.body.profileImage,
    });
    res.send({
      _id: user._id,
      email: user.email,
      profileImage: req.body.profileImage,
      name: user.name,
      status: user.status,
      isAdmin: user.isAdmin,
    });
  } else {
    // send to database for pending users
    await db.connect();
    await User.create({
      name: req.body.name,
      email: req.body.email,
      status: "pending",
      isAdmin: false,
      profileImage: req.body.profileImage,
    });

    //response to front
    res.send({
      status: "pending",
      isAdmin: false,
    });
  }
});

export default handler;
