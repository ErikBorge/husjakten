"use server";

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function getAllHouses() {
  try {
    const client = await clientPromise;
    const database = client.db(process.env.MONGODB_DATABASE); // Replace with your database name
    const collection = database.collection(
      process.env.MONGODB_COLLECTION_ALL_HOUSES as string
    );
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
  }
}

// old code together with the code in mongodb.ts. keeping for reference

// // import { MongoClient } from "mongodb";
// import { NextResponse } from "next/server";
// import client from "@/lib/mongodb";

// export async function getAllHouses() {
//   try {
//     console.log("running client.connect()");

//     const mongoClient = await client.connect();
//     console.log("connected to client");
//     console.log("choosing database");

//     const database = mongoClient.db(process.env.MONGODB_DATABASE); // Replace with your database name
//     console.log("choosing collection");
//     const collection = database.collection(
//       process.env.MONGODB_COLLECTION_ALL_HOUSES as string
//     );
//     console.log("finding data");
//     const data = await collection.find({}).toArray();
//     console.log("data found! returning now");

//     return NextResponse.json(data);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return NextResponse.json(
//         { error: `Failed to fetch data: ${error.message}` },
//         { status: 500 }
//       );
//     }
//     return NextResponse.json(
//       { error: "Failed to fetch data: Unknown error" },
//       { status: 500 }
//     );
//   } finally {
//     await client.close();
//   }
// }
