"use client";
import { useState } from "react";
import { addHouse } from "../actions";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

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
        if (response && response.status === 208) {
          setError("Huset finnes allerede i listen.");
        } else if (!response || response.status === 500) {
          console.error("Failed to add house", response.error);
          throw new Error("Couldn't add house");
        } else window.location.reload();
      } catch (error) {
        setError("Noe gikk galt. Vennligst prøv igjen.");
        console.error("Error:", error);
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Legg til hus</h2>
      <div className="flex">
        <Input
          type="text"
          placeholder="Finnkode"
          value={finnkode}
          onChange={(e) => setFinnkode(e.target.value)}
          className="mr-2 max-w-[250px]"
        />
        <Button onClick={handleAdd} disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {!loading ? "Lessago!" : "Jobber..."}
        </Button>
      </div>
      {error && (
        <p className="text-sm" style={{ color: "red" }}>
          {error}
        </p>
      )}{" "}
    </div>
  );
};

export default AddHouse;
