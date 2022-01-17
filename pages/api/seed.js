import nc from "next-connect";
import Categories from "../../models/Categories";
//import Product from "../../models/Product";
import data from "../../utils/data";
import db from "../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  //await User.deleteMany();
  //await User.insertMany(data.users);
  //await Product.deleteMany();
  //await Product.insertMany(data.products);
  await Categories.deleteMany();
  await Categories.insertMany(data.productCategories);

  res.send({ message: "seeded successfully" });
});

export default handler;
