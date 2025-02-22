import { useEffect, useState } from 'react';
function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/')
      .then((response) => response.json())
      .then((data) => setData(data.tasks));
  }, []);
  console.log(data);
  return (
    <>
      <h1>API Data</h1>
      {data.length == 0 ? (
        <p>No hay datos disponibles</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
