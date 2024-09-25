"use client";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import type { HouseType } from "../../types/house";
import { removeHouse } from "../actions";
import Dropdown from "./ui/Dropdown";
import Link from "next/link";

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
    <div className="border rounded-lg p-2 mb-2 shadow-md">
      <div className="flex">
        <img
          src={house.img}
          alt={house.title}
          className="w-64 h-64 object-cover rounded-lg mr-3"
        />
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <p className="text-sm font-light text-gray-600 mb-1">
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
            <h2 className="text-lg font-light text-black break-words">
              {house.title}
            </h2>
            <p className="text-md font-light text-black">
              {house.size} m² •{" "}
              {house.price.toLocaleString().replaceAll(",", " ")}
              ,-
            </p>
            <p className="text-sm font-light text-gray-600 mt-1">
              Endret: {house.changed}
            </p>

            <p>{JSON.stringify(house.history)}</p>
          </div>
          {house.history.length > 1 && (
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={house.history}
                  width={100}
                  height={100}
                  margin={{ top: 0, right: 20, left: 20, bottom: 0 }}
                >
                  <Area
                    dataKey="price"
                    type="stepAfter"
                    stroke="#172A3A"
                    fill="rgba(102, 199, 244, 0.5)"
                  >
                    {/* <LabelList
                    dataKey="price"
                    position="top"
                    formatter={(value) => {
                      let newValue = (value / 1000000).toFixed(3);
                      if (newValue.endsWith("00")) {
                        newValue = newValue.slice(0, -2);
                      }
                      return newValue.replace(".", ",");
                    }}
                  /> */}
                  </Area>
                  <Tooltip
                    allowEscapeViewBox={{ x: true, y: true }}
                    offset={0}
                    content={CustomTooltip}
                  />
                  <XAxis
                    dataKey="date"
                    // tickFormatter={(date) => {
                    //   const [year, month, day] = date.split("-");
                    //   return `${day.startsWith("0") ? day[1] : day}/${
                    //     month.startsWith("0") ? month[1] : month
                    //   }`;
                    // }}
                    hide={true}
                    tick={false}
                  />
                  <YAxis
                    domain={["dataMin - 1000000", "dataMax + 1000000"]}
                    hide={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
              {/* <XAxis
                    dataKey="date"
                    tickFormatter={(date) => {
                      const [year, month, day] = date.split("-");
                      return `${day.startsWith("0") ? day[1] : day}/${
                        month.startsWith("0") ? month[1] : month
                      }`;
                    }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    domain={["dataMin - 1000000", "dataMax + 1000000"]}
                    hide={true}
                  />
                  <Bar dataKey="price" fill="#87CEFA" barSize={20}>
                    <LabelList
                      dataKey="price"
                      position="top"
                      formatter={(value) => {
                        let newValue = (value / 1000000).toFixed(3);
                        if (newValue.endsWith("00")) {
                          newValue = newValue.slice(0, -2);
                        }
                        return newValue.replace(".", ",");
                      }}
                    />
                  </Bar>
                </BarChart> */}
            </div>
          )}
        </div>
      </div>
      {collection !== process.env.NEXT_PUBLIC_CAH && (
        <Dropdown items={[{ label: "Slett", onClick: handleDelete }]} />
      )}
      <p>
        Finnkode:{" "}
        <Link
          href={`https://finn.no/${house.finnkode}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {house.finnkode}
        </Link>
      </p>
    </div>
  );
};

export default House;

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  console.log({ active, payload, label });

  if (active && payload && payload.length) {
    return (
      <div className="px-4 py-2 bg-white border border-gray-200 rounded-md">
        <p className="text-md font-medium">
          {payload[0]?.value?.toLocaleString("no")} ,-
        </p>
        <p className="text-xs text-gray-500">
          {new Date(label).toLocaleDateString("no", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p className="text-xs text-gray-500">{payload[0]?.payload.status}</p>
      </div>
    );
  }

  return null;
};
