import Retool from "./components/Retool";
import React, { useState, useEffect } from "react";

const App = () => {
  const sample = {
    name: "value",
    example2: 19999,
    example3: { hello: "world" },
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
      <button
        onClick={() => {
          setData({ ...data, example2: "new value" });
        }}
      >
        This is button
      </button>
      <input
        type="text"
        value={data.input}
        onChange={(e) => setData({ ...data, input: e.target.value })}
      />
      <p id="hello"> Hey123 </p>
      <h1> {retoolData} </h1>
      <p id="hello"> {JSON.stringify(data)} </p>
      <Retool
        url="https://support.retool.com/embedded/public/cb9e15f0-5d7c-43a7-a746-cdec870dde9a"
        data={data}
        height="500px"
        width="500px"
      ></Retool>
    </div>
  );
};

export default App;
