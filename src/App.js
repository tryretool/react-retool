import Retool from "./components/Retool"

function App() {
    return (
        // <Retool url="https://retoolin.tryretool.com/embedded/public/f7607e1f-670a-4ebf-9a09-be54cf17181e"></Retool>
        <Retool
            data={{
                example: "value",
            }}
            url="https://example.retool.com/embedded/public/fb30f045-f2d3-461d-9b19-ddfee7357986"
        ></Retool>
    )
}

export default App
