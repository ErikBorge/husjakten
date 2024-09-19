"use client";
import { data } from "/lib/dummyData";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";

const HouseItem = ({ house }) => {
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
          </div>
          <div>
            {/* <BarChart width={400} height={100} data={house.historicalPrices}>
              <XAxis
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
        </div>
      </div>
    </div>
  );
};

const HouseList = () => {
  // const houses = data;
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchHouses = async () => {
      setError(false);
      setLoading(true);
      const response = await fetch("/api/get-all"); // Call your API route
      if (!response.ok) {
        setError(true);
        setLoading(false);
      } else {
        const data = await response.json();
        setHouses(data);
        setLoading(false);
      }
      console.log(data);
    };

    fetchHouses();
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error ? (
            <div>Uh-uh. something went wrong...</div>
          ) : (
            <>
              {houses.map((house) => (
                <HouseItem key={house.finnkode} house={house} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HouseList;
