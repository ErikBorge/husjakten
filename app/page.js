import HouseList from "./components/HouseList";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="max-w-[1000px] mx-auto p-4">
        <HouseList />
      </main>
    </div>
  );
}
