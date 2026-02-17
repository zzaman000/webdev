import GoalsList from "./GoalsList";
import "./App.css";

function App() {
  const name = "Zahin";
  const today = new Date().toLocaleDateString();

  return (
    <div className="container">
      <h1 className="title">Hello React</h1>

      <p className="about">
        Hi, I'm {name}. I’m learning React to build clean and interactive user
        interfaces. Today is {today}.
      </p>

      <GoalsList />
    </div>
  );
}

export default App;
