import { HouseType } from "@/types/house";
import House from "./House";

const HouseList = async () => {
  // const houses = data; // dummy data
  console.log(
    "caling api route",
    `${
      process.env.VERCEL_URL
        ? "https://" + process.env.VERCEL_URL
        : "http://localhost:3001"
    }/api/get-all`
  );

  const response = await fetch(
    `${
      process.env.VERCEL_URL
        ? "https://" + process.env.VERCEL_URL
        : "http://localhost:3001"
    }/api/get-all`
  );
  console.log("got response. it is");
  console.log(response);

  if (!response.ok) {
    const errorText = await response.text();
    console.error(
      "Failed to fetch houses. Status:",
      response.status,
      "Error:",
      errorText
    );
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
