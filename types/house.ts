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
    price: Array<{ [key in DateKey]: number }>;
    status: Array<{ [key in DateKey]: string }>;
  };
  added: DateKey;
};
