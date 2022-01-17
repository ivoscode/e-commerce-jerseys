import Head from "next/head";
import Layout from "../components/Layout";
import ProductsGrid from "../components/ProductsGrid";
export default function Home(props) {
  const { products } = props;

  return (
    <Layout>
      <Head>
        <title>e-commerce</title>
        <meta name="description" content="T-shirts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductsGrid products={products} />
    </Layout>
  );
}
// export async function getServerSideProps() {
//   await db.connect();
//   const products = await Product.find({}).lean();

//   return {
//     props: {
//       products: products.map(db.convertDocToObj),
//     },
//   };
// }
