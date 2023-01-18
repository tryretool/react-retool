import Retool from "./components/Retool";
import { useState } from "react";

const App = () => {
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
        url="https://retoolin.tryretool.com/embedded/public/9e6c7390-922d-41bd-b038-2e9c0476867c"
        data={data}
        height="700px"
        width="1000px"
        onData={setRetoolData}
        sandbox 
      />
      <h1> {JSON.stringify(retoolData)} </h1>
    </div>
  );
};

export default App;
