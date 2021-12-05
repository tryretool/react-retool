import Retool from "./components/Retool";
import { useState, useEffect } from "react";

const App = () => {
  const sample = {
    example1: "",
    example2: false,
    input: "",
  };

  useEffect(() => {
    const handler = (event) => {
      if (event.data?.type !== "PARENT_WINDOW_QUERY") {
        setRetoolData(event.data);
      }
    };

    window.addEventListener("message", handler);

    return () => window.removeEventListener("message", handler);
  }, []);

  const [retoolData, setRetoolData] = useState("");
  const [data, setData] = useState(sample);
  return (
    <div>
      <h1> React-Retool</h1>
      <button
        onClick={() => {
          setData({ ...data, example2: !data.example2 });
        }}
      >
        Click me!
      </button>
      <br />
      <br />
      <label> Share something: </label>
      <input
        type="text"
        value={data.input}
        onChange={(e) => setData({ ...data, input: e.target.value })}
      />
      <br />
      <br />
      <Retool
        url="https://support.retool.com/embedded/public/cb9e15f0-5d7c-43a7-a746-cdec870dde9a"
        data={data}
        height="700px"
        width="1000px"
      ></Retool>
      <h1> {retoolData} </h1>
    </div>
  );
};

export default App;
