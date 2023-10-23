import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useGlobalContext } from "./context";

function App() {
  const { address, isConnected, isDisconnected, sumState, divState } =
    useGlobalContext();

  console.log("sumContract from app.jsx", sumState);
  console.log("divContract from app.jsx", divState);
  return (
    <div className="app">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 12,
        }}
      >
        <ConnectButton />
      </div>

      <h1>{address}</h1>
      <h1>{isConnected ? "Connected" : "Not Connected"}</h1>
    </div>
  );
}

export default App;
