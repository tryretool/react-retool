import Retool from "./components/Retool";
import React, { useState, useEffect } from "react";

const App = () => {
  const sample = {
    example: "value",
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
    <div style={{ height: "500px" }}>
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
        url="https://support.retool.com/apps/Ben/parent%20window%20query123"
        data={data}
      ></Retool>
    </div>
  );
};

export default App;
