import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/movies`).then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <>
      <div className="flex flex-col w-screen h-screen items-center justify-center">
        FullStack Template with React, Express, and MySQL, easy to deploy with
        Docker, dont forget to check the README.md file!
        <p className="">
          Test Backend API (if correct you should see a movie list) :
        </p>
        <div>
          {data.length === 0 ? (
            <p>
              If you see this, you may have wrong info in both .env from
              /frontend and /backend
            </p>
          ) : (
            <ul>
              {data.map((movie) => (
                <li key={movie.id}>{movie.title}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
