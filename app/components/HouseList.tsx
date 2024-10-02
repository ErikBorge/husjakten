import { HouseType } from "@/types/house";
import House from "./House";
import { getList } from "../actions";
import AddHouse from "./AddHouse";
import { decodeCollectionName } from "../../lib/utils";

const HouseList = async ({ name }: { name: string }) => {
  const response = await getList(decodeCollectionName(name));
  if (!response || !("data" in response)) {
    console.error("Failed to fetch houses");
    throw new Error("Couldn't fetch houses");
  }
  const houses = response.data as unknown as HouseType[];

  return (
    <div className="py-4">
      {houses.length === 0 ? (
        <div>No houses found.</div>
      ) : (
        houses.map((house) => (
          <House key={house.finnkode} house={house} collection={name} />
        ))
      )}
      {name !== process.env.MONGODB_COLLECTION_ALL_HOUSES && (
        <AddHouse collection={name} />
      )}
    </div>
  );
};

export default HouseList;
