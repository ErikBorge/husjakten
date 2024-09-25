type DateKey = `${number}-${number}-${number}`;

export type HouseType = {
  finnkode: string;
  price: number;
  img: string;
  title: string;
  address: string;
  size: number;
  changed: string;
  status: "active" | "inactive" | "sold";
  history: {
    date: DateKey;
    price: number;
    status: "active" | "inactive" | "sold";
  }[];
  added: DateKey;
};
