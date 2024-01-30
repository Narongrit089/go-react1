import ItemsList from "./component/ItemsList";
import Students from "./component/StudentsList";
import Subjects from "./component/SubjectsList";
import "./App.css";

function App() {
  return (
    <>
      <div className=" block">
        <h1 className="pt-5">My Front-End</h1>
        <div className="card pl-20">
          <ItemsList />
        </div>
        <div className="card">
          <Subjects />
        </div>
        <div className="card">
          <Students />
        </div>
      </div>
    </>
  );
}

export default App;
