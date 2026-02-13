import { useState } from "react";
import Form from "./Form";
import Display from "./Display";
import "./styles.css";

export default function App() {
  const [submittedData, setSubmittedData] = useState(null);

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Registration Form</h2>

        <Form onSubmitData={setSubmittedData} />

        {submittedData && <Display data={submittedData} />}
      </div>
    </div>
  );
}
