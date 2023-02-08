import Retool from "./components/Retool";
import { useState } from "react";

const App = () => {
  const iframeStyle = {
    border: "2px solid red",
  };

  const sample = {
    example1: "",
    example2: false,
    input: "",
  };

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
        onData={setRetoolData}
        styling={iframeStyle}
      ></Retool>
      <h1> {JSON.stringify(retoolData)} </h1>
    </div>
  );
};

export default App;
