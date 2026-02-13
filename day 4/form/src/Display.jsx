export default function Display({ data }) {
  return (
    <div className="display-card">
      <h3>Submitted Information</h3>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Phone:</strong> {data.phone}</p>
    </div>
  );
}
