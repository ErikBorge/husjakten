import { CollectionInfo } from "mongodb";
import { getLists } from "../actions";
import { decodeCollectionName } from "../utils/convertCollectionName";
import Link from "next/link";

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
        <Link href={`/${name}`} key={"list" + i}>
          {decodeCollectionName(name)}
        </Link>
      ))}
    </div>
  );
};

export default ListList;
