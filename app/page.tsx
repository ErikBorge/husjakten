import NewList from "./components/NewList";
import ListList from "./components/ListList";

const Home = async () => {
  return (
    <>
      <div className="mb-10">
        <ListList />
      </div>
      <div className="my-10">
        <NewList />
      </div>
    </>
  );
};

export default Home;
