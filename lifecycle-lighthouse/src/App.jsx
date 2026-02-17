import { useEffect, useMemo, useState } from "react";
import "./App.css";

function makeItems() {
  return [
    { id: 1, title: "Fix navbar alignment", priority: "High", owner: "UI" },
    { id: 2, title: "Refactor card component", priority: "Low", owner: "Frontend" },
    { id: 3, title: "Improve loading skeleton", priority: "High", owner: "UX" },
    { id: 4, title: "Clean up console warnings", priority: "Low", owner: "DevEx" },
    { id: 5, title: "Add empty state message", priority: "Low", owner: "UI" },
    { id: 6, title: "Optimize re-render paths", priority: "High", owner: "Frontend" }
  ];
}

export default function App() {
  // fetch simulation state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // string | null
  const [data, setData] = useState([]); // array

  // filter state
  const [filter, setFilter] = useState("All"); // All | High | Low

  // beacon state (interval)
  const [beaconOn, setBeaconOn] = useState(false);

  // --- Simulated fetch function (used on mount + reload) ---
  function runFetch() {
    setLoading(true);
    setError(null);
    setData([]);

    // 1–2 seconds delay
    const delayMs = 1200;

    // choose success/failure (mostly success so you can see items)
    const shouldFail = Math.random() < 0.2;

    setTimeout(() => {
      if (shouldFail) {
        setLoading(false);
        setError("Beacon lost signal. Please reload.");
        setData([]);
        return;
      }

      setLoading(false);
      setError(null);
      setData(makeItems());
    }, delayMs);
  }

  // 2) useEffect on mount
  useEffect(() => {
    runFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 5) Cleanup example: beacon pulse interval
  useEffect(() => {
    const id = setInterval(() => {
      setBeaconOn(prev => !prev);
    }, 1000);

    // cleanup on unmount
    return () => clearInterval(id);
  }, []);

  // 4) Filter behavior: derived rendering (recommended)
  const filteredData = useMemo(() => {
    if (filter === "All") return data;
    return data.filter(item => item.priority === filter);
  }, [data, filter]);

  const statusText = loading ? "Loading" : error ? "Error" : "Success";

  return (
    <div className="page">
      <h1>Lifecycle Lighthouse</h1>

      {/* Status Panel */}
      <section className="panel">
        <h2>Status Panel</h2>

        <div className="statusRow">
          <span className={`pill ${statusText.toLowerCase()}`}>{statusText}</span>
          <span className={`beacon ${beaconOn ? "on" : "off"}`}>
            Beacon Pulse: {beaconOn ? "ON" : "OFF"}
          </span>
        </div>

        {loading && <p className="muted">Fetching signals from the lighthouse...</p>}
        {error && <p className="errorText">{error}</p>}
        {!loading && !error && <p className="muted">Data received. Ready for filtering.</p>}
      </section>

      {/* Controls Panel */}
      <section className="panel">
        <h2>Controls Panel</h2>

        <div className="controls">
          <button onClick={runFetch} disabled={loading}>
            {loading ? "Reloading..." : "Reload"}
          </button>

          <label className="controlGroup">
            Filter:
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              disabled={loading}
            >
              <option value="All">All</option>
              <option value="High">High Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </label>
        </div>
      </section>

      {/* Data Display */}
      <section className="panel">
        <h2>Data Display</h2>

        {loading && <p className="muted">Loading cards...</p>}

        {!loading && error && (
          <p className="muted">
            No data to show. Try Reload to fetch again.
          </p>
        )}

        {!loading && !error && (
          <>
            <p className="muted">
              Showing <b>{filteredData.length}</b> item(s) (Filter: <b>{filter}</b>)
            </p>

            <div className="grid">
              {filteredData.map(item => (
                <div key={item.id} className={`card ${item.priority === "High" ? "high" : "low"}`}>
                  <div className="cardTop">
                    <h3>{item.title}</h3>
                    <span className={`tag ${item.priority === "High" ? "high" : "low"}`}>
                      {item.priority}
                    </span>
                  </div>
                  <p className="muted">Owner: {item.owner}</p>
                </div>
              ))}
            </div>

            {filteredData.length === 0 && (
              <p className="muted">No items match this filter.</p>
            )}
          </>
        )}
      </section>
    </div>
  );
}
