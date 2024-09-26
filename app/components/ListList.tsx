import { CollectionInfo } from "mongodb";
import { getLists } from "../actions";
import { decodeCollectionName } from "../../lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ListList = async () => {
  const response = await getLists();
  if (!response) {
    throw new Error("Failed to fetch lists");
  } else if (!response.ok) {
    throw new Error("Couldn't fetch lists");
  }
  const lists: (CollectionInfo | Pick<CollectionInfo, "name" | "type">)[] =
    response instanceof Response ? await response.json() : [];

  return (
    <div>
      <h2>Lister</h2>
      {lists.map(({ name }, i) => (
        <div key={"list" + i}>
          <Button asChild variant={"link"}>
            <Link href={`/${name}`}>{decodeCollectionName(name)}</Link>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ListList;
