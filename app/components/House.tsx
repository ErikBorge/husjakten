import type { HouseType } from "../../types/house";

const House = ({ house }: { house: HouseType }) => {
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

export default House;
