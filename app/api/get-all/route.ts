import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export async function GET() {
  console.log("MONGODB_URI:", process.env.MONGODB_URI);
  console.log("MONGODB_DATABASE:", process.env.MONGODB_DATABASE);
  console.log(
    "MONGODB_COLLECTION_ALL_HOUSES:",
    process.env.MONGODB_COLLECTION_ALL_HOUSES
  );
  try {
    console.log("running client.connect()");

    await client.connect();
    console.log("connected to client");
    console.log("choosing database");

    const database = client.db(process.env.MONGODB_DATABASE); // Replace with your database name
    console.log("choosing collection");
    const collection = database.collection(
      process.env.MONGODB_COLLECTION_ALL_HOUSES as string
    );
    console.log("finding data");
    const data = await collection.find({}).toArray();
    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to fetch data: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to fetch data: Unknown error" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

// from BE
// export async function GET() {
//   const url = process.env.BE_URL + "/get-all";
//   try {
//     const res = await fetch(url);
//     if (res.ok) {
//       const data = await res.json();
//       return new Response(JSON.stringify(data), {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       });
//     }
//   } catch (error) {
//     return new Response(
//       JSON.stringify({
//         error: "Failed to fetch data",
//         details: (error as Error).message,
//       }),
//       {
//         status: 500, // Internal Server Error
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }
