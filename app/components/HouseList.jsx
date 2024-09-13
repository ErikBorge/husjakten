"use client";
import React from "react";
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
          src={house.image}
          alt={house.title}
          className="w-64 h-64 object-cover rounded-lg mr-3"
        />
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <p className="text-sm font-light text-gray-600 mb-1">
              {house.address} • {house.size} m²
            </p>
            <h2 className="text-lg font-light text-black break-words">
              {house.title}
            </h2>
            <p className="text-md font-light text-black">
              {house.size} m² •{" "}
              {house.price.toLocaleString().replaceAll(",", " ")},-
            </p>
            <p className="text-sm font-light text-gray-600 mt-1">
              Endret: {house.changed}
            </p>
          </div>
          <div>
            <BarChart width={400} height={100} data={house.historicalPrices}>
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
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

const HouseList = () => {
  const houses = [
    {
      finnkode: "369477606",
      address: "JAR, Trudvangveien 17B, 1358 JAR",
      size: 299,
      changed: "13. sep. 2024",
      price: 12500000,
      title:
        "Enebolig over 2 plan +kjeller og loft. Sentral og barnevennlig beliggenhet. Stor hage og gode solforhold. Dobbel garasje",
      image:
        "https://images.finncdn.no/dynamic/1280w/2024/9/vertical-2/13/6/369/477/606_69176cb7-22f7-46b0-90ee-5b56b0393711.jpg",
      historicalPrices: [
        { date: "2023-09-01", price: 11800000 },
        { date: "2024-09-13", price: 12500000 },
      ],
    },
    {
      finnkode: "345122094",
      address: "Stabekk, Storengveien 61C, 1368 Stabekk",
      size: 260,
      changed: "9. sep. 2024",
      price: 13490000,
      title:
        "Pen enebolig innerst i blindvei med stor flat og solrik tomt - Familievennlig planløsning - Mulighet for hybel*",
      image:
        "https://images.finncdn.no/dynamic/1280w/2024/9/vertical-2/09/4/345/122/094_5859d2ce-bbe9-41a5-9299-bc993b21af6d.jpg",
      historicalPrices: [
        { date: "2023-09-01", price: 11800000 },
        { date: "2023-09-05", price: 12200000 },
        { date: "2024-09-13", price: 13490000 },
      ],
    },
    {
      finnkode: "366663026",
      address: "BEKKESTUA, Gamle Ringeriksvei 71A, 1356 BEKKESTUA",
      size: 271,
      changed: "7. sep. 2024",
      price: 14500000,
      title:
        "Bekkestua nær Haslum skole - Innholdsrik og hyggelig enebolig med stor hybel. Barnevennlig. Solrik utsiktstomt.",
      image:
        "https://images.finncdn.no/dynamic/1280w/2024/9/vertical-2/07/6/366/663/026_91ee8bf5-beb3-418d-a3a9-9fb818651a39.jpg",
      historicalPrices: [
        { date: "2023-09-01", price: 11800000 },
        { date: "2023-09-05", price: 12200000 },
        { date: "2024-09-13", price: 14500000 },
      ],
    },
  ];

  return (
    <div className="container mx-auto p-4">
      {houses.map((house) => (
        <HouseItem key={house.finnkode} house={house} />
      ))}
    </div>
  );
};

export default HouseList;
