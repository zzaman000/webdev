export default function CourseCard({ course, onSelect }) {
  return (
    <div
      className="card"
      onClick={() => onSelect(course)}
    >
      {course.level === "Advanced" && (
        <span className="level-flag">Advanced</span>
      )}

      <h3>{course.title}</h3>
      <p>Category: {course.category}</p>
      <p>Level: {course.level}</p>
      <p>Rating: {course.rating}</p>

      {course.rating >= 4.5 && (
        <span className="badge">Top Pick</span>
      )}
    </div>
  );
}
