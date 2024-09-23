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
    returnError(error);
  }
}

// Create collection (i.e. "a house list")
export async function createList(name: string) {
  try {
    const client = await clientPromise;
    const database = client.db(process.env.MONGODB_DATABASE); // Replace with your database name
    await database.createCollection(name);
    return NextResponse.json(
      { message: `Collection "${name}" created successfully.` },
      { status: 200 }
    );
  } catch (error: unknown) {
    returnError(error);
  }
}

// Get all entries in collection (i.e. "a house list")
export async function getList(collectionName: string) {
  try {
    const client = await clientPromise;
    const database = client.db(process.env.MONGODB_DATABASE); // Replace with your database name

    // Check if the collection exists
    const collections = await database
      .listCollections({ name: collectionName })
      .toArray();
    if (collections.length === 0) {
      return NextResponse.json(
        { error: `Collection "${collectionName}" does not exist.` },
        { status: 404 }
      );
    }

    const collection = database.collection(collectionName);
    const data = await collection.find({}).toArray();

    // Fetch all entries from the MONGODB_COLLECTION_ALL_HOUSES collection
    const allHousesCollection = database.collection(
      process.env.MONGODB_COLLECTION_ALL_HOUSES as string
    );
    const allHousesData = await allHousesCollection.find({}).toArray();

    // Create a map for quick lookup of all houses by finnkode
    const allHousesMap = new Map(
      allHousesData.map((item) => [item.finnkode, item])
    );

    // Match entries based on finnkode
    const matchedData = data
      .map((item) => {
        const match = allHousesMap.get(item.finnkode) || null; // Add matched house or null if not found
        return match === null ? null : { ...match };
      })
      .filter((i) => i !== null);

    return NextResponse.json(matchedData);
  } catch (error: unknown) {
    returnError(error);
  }
}

export async function getLists() {
  try {
    const client = await clientPromise;
    const database = client.db(process.env.MONGODB_DATABASE);

    // Get all collections
    const collections = await database.listCollections().toArray();
    return NextResponse.json(collections);
  } catch (error: unknown) {
    returnError(error);
  }
}

export async function removeHouse(finnkode: string, collectionName: string) {
  try {
    const client = await clientPromise;
    const database = client.db(process.env.MONGODB_DATABASE);
    const collection = database.collection(collectionName);
    // Get all collections
    const result = await collection.deleteOne({ finnkode: finnkode });
    if (result.deletedCount === 0) {
      return { message: "Couldn't delete house", status: 404 };
    }
    return { message: "House deleted successfully", status: 200 };
  } catch {
    return {
      message: "An unknown error occured in removeHouse()",
      status: 500,
    };
  }
}

export async function addHouse(finnkode: string, collection: string) {
  const url = process.env.BE_URL + "/add-house";
  try {
    const response = await fetch(
      `${url}?finnkode=${finnkode}&collection=${collection}`
    );
    if (response && response.status === 200) {
      return { status: 200 };
    }
    return { status: 500, error: "Couldn't add house" };
  } catch (error: unknown) {
    return { status: 500, error };
  }
}

const returnError = (error: unknown) => {
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
};

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
