import Head from "next/head";
import Layout from "../../components/Layout";
import CategoryScreen from "../../components/product/CategoryScreen";
import Product from "../../models/Product";
import db from "../../utils/db";

export default function Category({ products }) {
  return (
    <Layout>
      <Head>
        <title>e-commerce</title>
        <meta name="description" content="T-shirts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CategoryScreen products={products} />
    </Layout>
  );
}
export async function getServerSideProps({ query }) {
  await db.connect();
  const products = await Product.find({
    "category.value": `${query.category.toLowerCase()}`,
  })
    .sort({ yuId: -1 })
    .lean();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
