import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL)
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Frontend</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;