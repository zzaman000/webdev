export default function SelectedPanel({ item }) {
  if (!item) return <p className="select-msg">Select a course to see details</p>;

  return (
    <div className="details">
      <h2>Selected Course</h2>
      <p><b>Title:</b> {item.title}</p>
      <p><b>Category:</b> {item.category}</p>
      <p><b>Level:</b> {item.level}</p>
      <p><b>Rating:</b> {item.rating}</p>
    </div>
  );
}
