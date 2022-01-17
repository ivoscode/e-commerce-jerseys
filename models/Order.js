import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    //user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    user: {
      name: { type: String, required: true },
      //email: { type: String, required: false },
    },
    status: { type: String, required: true, default: "inprogress" },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: Array, default: [] },
        price: { type: Number, required: true },
        size: { type: String, required: true },
      },
    ],
    //shippingAddress: {
    //fullName: { type: String, required: true },
    // address: { type: String, required: true },
    // city: { type: String, required: true },
    // postalCode: { type: String, required: true },
    //country: { type: String, required: true },
  },
  // paymentMethod: { type: String, required: true },
  // itemsPrice: { type: Number, required: true },
  // shippingPrice: { type: Number, required: true },
  // taxPrice: { type: Number, required: true },
  // totalPrice: { type: Number, required: true },
  // isPaid: { type: Boolean, required: true, default: false },
  // isDelivered: { type: Boolean, required: true, default: false },
  // paidAt: { type: Date },
  // deliveredAt: { type: Date },
  // },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
