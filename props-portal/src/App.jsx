import { useState } from "react";
import CourseCard from "./components/CourseCard";
import SelectedPanel from "./components/SelectedPanel";
import "./App.css";

export default function App() {
  const [selected, setSelected] = useState(null);

  const courses = [
    { id:1, title:"React Basics", category:"Frontend", level:"Beginner", rating:4.3 },
    { id:2, title:"Advanced React", category:"Frontend", level:"Advanced", rating:4.8 },
    { id:3, title:"Node Fundamentals", category:"Backend", level:"Intermediate", rating:4.2 },
    { id:4, title:"Data Structures", category:"Computer Science", level:"Advanced", rating:4.7 },
    { id:5, title:"UI Design", category:"Design", level:"Beginner", rating:4.6 },
    { id:6, title:"Databases", category:"Backend", level:"Intermediate", rating:4.1 }
  ];

  return (
    <div className="container">
      <h1>Props Portal</h1>

      <div className="grid">
        {courses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onSelect={setSelected}
          />
        ))}
      </div>

      <SelectedPanel item={selected} />
    </div>
  );
}
