import nc from "next-connect";
import Product from "../../../models/Product";
import db from "../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const options = {
    page: parseInt(req.query.page, 10) + 1 || 1,
    limit: parseInt(req.query.limit, 10) || 10,
    sort: { yuId: -1 },
  };
  const products = await Product.paginate({}, options);

  res.send(products);
});

export default handler;
