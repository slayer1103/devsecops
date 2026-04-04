import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then(res => res.json())
      .then(data => setMessage(data));
  }, []);

  return (
    <div>
      <h1>Frontend</h1>
      <p>Status: {message ? message.message : "Loading..."}</p>
      <p>Time: {message ? message.time : "-"}</p>
    </div>
  );
}

export default App;