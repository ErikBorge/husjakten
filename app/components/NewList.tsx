"use client";

import { useState } from "react";
import { createList } from "../actions";
import { encodeCollectionName } from "../../lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const NewList = () => {
  const [listName, setListName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const create = async () => {
    if (listName !== "") {
      setLoading(true);
      try {
        const encodedListName = encodeCollectionName(listName);
        await createList(encodedListName);
      } catch (error) {
        setLoading(false);
        console.error(error);
        throw new Error("Couldn't create list");
      }
      setLoading(false);
    }
  };
  return (
    <>
      <h2>Lag ny liste</h2>
      <div className="flex">
        <Input
          type="text"
          placeholder="Min liste 123"
          onChange={(e) => setListName(e.target.value)}
          className="mr-2 max-w-[250px]"
        />
        <Button onClick={create} disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {!loading ? "Lag liste" : "Lager liste..."}
        </Button>
      </div>
    </>
  );
};

export default NewList;
