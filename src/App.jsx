import React, { Suspense } from "react";
import "./App.css";
import "./styles/color.css";
import "./styles/main.css";
const Home = React.lazy(() => import("../src/components/home"));
function Loading() {
  return <div className="container">Loading...</div>;
}
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Home />
    </Suspense>
  );
}

export default App;
