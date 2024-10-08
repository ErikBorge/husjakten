import { HouseType } from "@/types/house";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

const HouseGraph = ({ history }: { history: HouseType["history"] }) => {
  const extendedHistory = history.map((h, i) =>
    i === 0 || i === history.length - 1
      ? { ...h, phantomPrice: h.price }
      : { ...h, phantomPrice: null }
  ) as {
    price: number | null;
    status: string | null;
    date: string;
    phantomPrice: number | null;
  }[];
  extendedHistory.unshift({
    price: null,
    status: null,
    date: new Date(new Date(history[0].date).getTime() - 86400000)
      .toISOString()
      .split("T")[0],
    phantomPrice: history[0].price,
  });
  extendedHistory.push({
    price: null,
    status: null,
    date: new Date(
      new Date(history[history.length - 1].date).getTime() + 86400000
    )
      .toISOString()
      .split("T")[0],
    phantomPrice: history[history.length - 1].price,
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={extendedHistory}
        width={100}
        height={100}
        margin={{ top: 0, right: 10, left: 10, bottom: 0 }}
      >
        <Area
          dataKey="phantomPrice"
          type="step"
          stroke="#172A3A"
          strokeDasharray="3 3"
          fill="rgba(102, 199, 244, 1)"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        <Area
          dataKey="price"
          type="step"
          stroke="#172A3A"
          fill="rgba(102, 199, 244, 1)"
          strokeWidth="2"
        />

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
  );
};

export default HouseGraph;

const statusMap = {
  active: "Aktiv",
  inactive: "Deaktivert",
  sold: "Solgt",
};
const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    if (payload[0].payload.price === null) return null;
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
        <p className="text-xs text-gray-500">
          {statusMap[payload[0]?.payload.status as keyof typeof statusMap]}
        </p>
      </div>
    );
  }

  return null;
};
