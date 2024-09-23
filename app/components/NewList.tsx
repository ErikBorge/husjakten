"use client";

import { useState } from "react";
import { createList } from "../actions";
import { encodeCollectionName } from "../utils/convertCollectionName";

const NewList = () => {
  const [listName, setListName] = useState<string>("");

  const create = async () => {
    if (listName !== "") {
      console.log("creating list: ", listName);
      const encodedListName = encodeCollectionName(listName);
      const response = await createList(encodedListName);
      if (!response || !response.ok) {
        throw new Error("Couldn't create list");
      }
      const res = await response.json();
      console.log({ res });
    }
  };
  return (
    <div>
      <input type="text" onChange={(e) => setListName(e.target.value)}></input>
      <button onClick={create}>Create list </button>
    </div>
  );
};

export default NewList;
