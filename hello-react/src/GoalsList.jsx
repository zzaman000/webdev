export default function GoalsList() {
  const goals = [
    "Understand JSX rendering",
    "Build reusable components",
    "Practice props",
    "Style React layouts",
    "Prepare for real projects"
  ];

  return (
    <div className="goals">
      <h2>Learning Goals</h2>
      <ul>
        {goals.map((goal, index) => (
          <li key={index}>{goal}</li>
        ))}
      </ul>
    </div>
  );
}
