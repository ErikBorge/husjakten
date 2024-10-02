"use client";
import { useState } from "react";
import { addHouse } from "../actions";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const AddHouse = ({ collection }: { collection: string }) => {
  const router = useRouter();
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
        if (!response) throw new Error("Couldn't add house");
        const { status } = response;
        if (status === 200) router.refresh();
        else if (status === 208) {
          setError("Huset finnes allerede i listen.");
        } else if (response.status === 401) {
          throw new Error("Unauthorized");
        } else throw new Error("Unknown error");
      } catch (error) {
        setError("Noe gikk galt. Vennligst prøv igjen.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
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
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}{" "}
    </div>
  );
};

export default AddHouse;
