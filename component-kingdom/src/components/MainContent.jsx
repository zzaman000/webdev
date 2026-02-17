import Card from "./Card";

export default function MainContent() {
  const cards = [
    { title: "Components", text: "React apps are built from small pieces." },
    { title: "Reuse", text: "Reusable components reduce repetition." },
    { title: "Props", text: "Props pass data between components." },
    { title: "Structure", text: "Clean structure improves scalability." }
  ];

  return (
    <main className="main">
      <h2>Main Content</h2>

      <div className="card-container">
        {cards.map((card, index) => (
          <Card key={index} title={card.title} text={card.text} />
        ))}
      </div>
    </main>
  );
}
