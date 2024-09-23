import { Metadata } from "next";
import { decodeCollectionName } from "../utils/convertCollectionName";
import Head from "next/head";
import HouseList from "../components/HouseList";

const getMetadata = (list: string): Metadata => ({
  title: `${decodeCollectionName(list)}`,
});

const ListPage = async ({ params }: { params: { list: string } }) => {
  const { list } = params;
  const metadata = getMetadata(list);

  // You can fetch data based on dynamicParam here if needed
  // const data = await fetchData(dynamicParam);

  return (
    <>
      <Head>
        <title>{String(metadata.title || "Husjakten")}</title>
      </Head>
      <div>
        <h1>{decodeCollectionName(list)}</h1>
        <HouseList name={list} />
      </div>
    </>
  );
};

export default ListPage;
