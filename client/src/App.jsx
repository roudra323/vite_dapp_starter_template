import { ConnectButton } from "@rainbow-me/rainbowkit";

function App() {
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
    </div>
  );
}

export default App;
