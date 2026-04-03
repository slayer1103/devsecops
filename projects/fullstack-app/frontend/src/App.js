import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api")
      .then(res => res.json())
      .then(data => setMessage(data));
  }, []);

  return (
    <div>
      <h1>Frontend</h1>
      <p>Status: {message?.message}</p>
      <p>Time: {message?.time}</p>
    </div>
  );
}

export default App;