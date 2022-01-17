import nc from "next-connect";
import Product from "../../../models/Product";
import db from "../../../utils/db";
const handler = nc();

handler
  //   .use((req, res, next) => {
  //     throw new Error("oh no!");
  //     // or use next
  //     next(Error("oh no"));
  //   })
  .post(async (req, res) => {
    await db.connect();
    console.log("add a new product api req body", req.body);

    const newProduct = new Product({
      ...req.body,
    });
    const product = await newProduct.save();

    if (product) {
      res.status(201).send(product);
    } else {
      res.send({
        message: "Product not saved",
      });
    }
  });

export default handler;
