import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState(null);

 useEffect(() => {
  fetch("/api/user")
    .then(res => res.json())
    .then(data => setMessage(data));
}, []);

  return (
    <div>
      <h1>Frontend</h1>
      <p>Name: {message ? message.name : "Loading..."}</p>
      <p>Role: {message ? message.role : "-"}</p>
    </div>
  );
}

export default App;