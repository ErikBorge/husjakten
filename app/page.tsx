import NewList from "./components/NewList";
import ListList from "./components/ListList";

const Home = async () => {
  return (
    <>
      <h1 className="text-xl">Husjakten</h1>
      <div className="my-10">
        <ListList />
      </div>
      <div className="my-10">
        <NewList />
      </div>
    </>
  );
};

export default Home;
