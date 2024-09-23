import NewList from "./components/NewList";
import ListList from "./components/ListList";

const Home = async () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="max-w-[1000px] mx-auto p-4">
        <NewList />
        <ListList />
      </main>
    </div>
  );
};

export default Home;
