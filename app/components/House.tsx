"use client";

import type { HouseType } from "../../types/house";
import { removeHouse } from "../actions";
import HouseGraph from "./HouseGraph";
import Dropdown from "./ui/Dropdown";
import Link from "next/link";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";

const statusMap = {
  active: "Aktiv",
  inactive: "Deaktivert",
  sold: "Solgt",
};
const House = ({
  house,
  collection,
}: {
  house: HouseType;
  collection: string;
}) => {
  const handleDelete = async () => {
    await removeHouse(house.finnkode, collection);
    window.location.reload();
  };

  return (
    <div className="border rounded-lg p-3 mb-2 shadow-md">
      <div className="md:flex">
        <img
          src={house.img}
          alt={house.title}
          className="w-64 h-64 object-cover rounded-lg mr-3"
        />
        <div className="mt-2 mb:mt-0 flex-grow flex flex-col justify-between">
          <div className="flex justify-between">
            <div>
              <p className="text-xs md:text-sm font-light text-gray-600 md:mb-1">
                {house?.status !== "active" && (
                  <span
                    className={`${
                      house.status === "sold"
                        ? "bg-yellow-100"
                        : house.status === "inactive"
                        ? "bg-gray-300"
                        : ""
                    } py-1 px-2 border-0 rounded-sm text-s inline-flex text-gray-700 mr-2`}
                  >
                    {statusMap[house?.status]}
                  </span>
                )}
                {house.address}
              </p>
              <h2 className="text-sm md:text-md font-light text-black break-words mb-1 mb:mt-2 mb:mb-2 line-clamp-2">
                {house.title}
              </h2>
              <p
                className="text-sm md:text-md text-black"
                style={{ fontFamily: "var(--font-finn-medium)" }}
              >
                {house.size} m² •{" "}
                {house.price.toLocaleString().replaceAll(",", " ")}
                ,-
              </p>
              <p className="hidden md:block text-xs font-light text-gray-600 mt-1">
                <span>
                  Lagt til:{" "}
                  {new Date(house.added).toLocaleDateString("no", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>{" "}
                <span>
                  Endret:{" "}
                  {new Date(house.changed).toLocaleDateString("no", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </p>
            </div>
            <div>
              <Link
                href={`https://finn.no/${house.finnkode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 block"
              >
                <OpenInNewWindowIcon className="w-6 h-6" />
              </Link>
            </div>
          </div>
          {house.history.length > 1 && <HouseGraph history={house.history} />}
          {/* <p>
            Finnkode:{" "}
            <Link
              href={`https://finn.no/${house.finnkode}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {house.finnkode}
            </Link>
          </p> */}
        </div>
      </div>
      {collection !== process.env.NEXT_PUBLIC_CAH && (
        <Dropdown items={[{ label: "Slett", onClick: handleDelete }]} />
      )}
    </div>
  );
};

export default House;
