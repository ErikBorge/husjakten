import { HouseType } from "@/types/house";
import House from "./House";

const HouseList = async () => {
  // const houses = data; // dummy data
  const response = await fetch(
    `${process.env.VERCEL_URL || "http://localhost:3001"}/api/get-all`
  );
  if (!response.ok) {
    throw new Error("Couldn't fetch houses");
  }
  const houses: HouseType[] = await response.json();

  return (
    <div className="container mx-auto p-4">
      {houses.length === 0 ? (
        <div>No houses found.</div>
      ) : (
        houses.map((house) => <House key={house.finnkode} house={house} />)
      )}
    </div>
  );
};

export default HouseList;
