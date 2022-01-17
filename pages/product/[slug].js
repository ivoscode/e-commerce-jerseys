import Layout from "../../components/Layout";
import ProductScreen from "../../components/product/ProductScreen";
import Product from "../../models/Product";
import db from "../../utils/db";
export default function Slug(props) {
  return (
    <Layout>
      <ProductScreen product={props.product} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();

  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
