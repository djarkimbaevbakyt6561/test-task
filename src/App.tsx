import { useEffect, useState } from "react";
import "./App.css";
import { useGetGoodsQuery } from "./store/goodsApi";
import { AppLayoutStructure, DataStructure } from "./types/interface";
import { Route, Routes } from "react-router-dom";
import CardItem from "./components/card/CardItem";
import CharacterDetails from "./components/character/CharacterDetails";

const arrayListFromLocal = localStorage.getItem("list");
const list = arrayListFromLocal ? JSON.parse(arrayListFromLocal) : [];

const AppLayout = ({
  onlyLiked,
  toggleOnlyLikedHandler,
  arrayList,
  likeChangeHandler,
  deleteItemHandler,
}: AppLayoutStructure) => {
  return (
    <>
      <h1>Rick And Morty</h1>
      <div className="checkbox_container">
        <label>
          <input
            type="checkbox"
            checked={onlyLiked}
            onChange={toggleOnlyLikedHandler}
          />
          Show only liked
        </label>
      </div>
      <ul className="card_ul_container">
        {arrayList
          .filter((el: DataStructure) => (onlyLiked ? el.isLiked : true))
          .map((el: DataStructure, index: number) => (
            <CardItem
              image={el.image}
              status={el.status}
              species={el.species}
              name={el.name}
              location={el.location}
              id={el.id}
              key={el.id}
              isLiked={el.isLiked}
              likeChangeHandler={likeChangeHandler}
              deleteItemHandler={deleteItemHandler}
            />
          ))}
      </ul>
    </>
  );
};

function App() {
  const { data, isLoading } = useGetGoodsQuery({});
  const [arrayList, setArrayList] = useState(list);
  const [onlyLiked, setOnlyLiked] = useState(false);

  useEffect(() => {
    if (data && arrayListFromLocal === null) {
      setArrayList(
        data.results.map((el: DataStructure) => {
          return { ...el, isLiked: false };
        })
      );
    }
  }, [data]);
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(arrayList));
  }, [arrayList]);
  const likeChangeHandler = (id: number) => {
    const newArrayList = arrayList.map((el: DataStructure) => {
      if (el.id === id) {
        return { ...el, isLiked: !el.isLiked };
      }
      return el;
    });
    setArrayList(newArrayList);
  };
  const deleteItemHandler = (id: number) => {
    const newArrayList = arrayList.filter((el: DataStructure) => el.id !== id);
    setArrayList(newArrayList);
  };
  if (isLoading) return <h1>...Loading</h1>;
  return (
    <>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout
                arrayList={arrayList}
                deleteItemHandler={deleteItemHandler}
                likeChangeHandler={likeChangeHandler}
                toggleOnlyLikedHandler={() => setOnlyLiked(!onlyLiked)}
                onlyLiked={onlyLiked}
              />
            }
          />
          <Route
            path="/character/:charId"
            element={<CharacterDetails arrayList={arrayList} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
