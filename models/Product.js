import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productSchema = new mongoose.Schema(
  {
    yuId: { type: Number, required: false },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: Array, default: [] },
    image: { type: Array, default: [] },
    sizes: { type: Array, default: [] },
    price: { type: Number, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
productSchema.plugin(mongoosePaginate);
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
