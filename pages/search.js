import Head from "next/head";
import Layout from "../components/Layout";
import SearchScreen from "../components/search/SearchScreen";
import Product from "../models/Product";
import db from "../utils/db";
export default function Search({ products }) {
  return (
    <Layout>
      <Head>
        <title>e-commerce</title>
        <meta name="description" content="T-shirts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchScreen products={products} />
    </Layout>
  );
}
export async function getServerSideProps({ query }) {
  await db.connect();
  const products = await Product.find({}).lean();
  //const convProducts = products.map(db.convertDocToObj);
  const dataSearch = products.map(db.convertDocToObj).filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(query.q.toString().toLowerCase())
    );
  });

  return {
    props: {
      products: dataSearch,
    },
  };
}
