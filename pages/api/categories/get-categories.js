import Categories from "../../../models/Categories";
import db from "../../../utils/db";

export default async function handler(req, res) {
  await db.connect();

  try {
    const categoriesList = await Categories.find().lean();
    if (!categoriesList) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: categoriesList });
  } catch (error) {
    res.status(400).json({ success: false });

    console.log(error);
  }
}
