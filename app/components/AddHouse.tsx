"use client";
import { useState } from "react";
import { addHouse } from "../actions";

const AddHouse = ({ collection }: { collection: string }) => {
  const [finnkode, setFinnkode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async () => {
    if (!finnkode || !/^\d+$/.test(finnkode)) {
      setError("Ugyldig input. vennligst skriv inn kun finnkode.");
    } else {
      setLoading(true);
      setError("");
      try {
        const response = await addHouse(finnkode, collection);
        if (!response || response.status === 500) {
          console.error("Failed to add house", response.error);
          throw new Error("Couldn't add house");
        }
        window.location.reload();
      } catch (error) {
        setError("Noe gikk galt. Vennligst prøv igjen.");
        console.error("Error:", error);
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        value={finnkode}
        onChange={(e) => setFinnkode(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default AddHouse;
