import { useState } from 'react';

import Gamified from "./pages/Gamified/Gamified";
import Portfolio from "./pages/Portfolio/Portfolio";

function App() {
  const [gamified, setGamified] = useState(false);

  return (
    <div className="App">
      { gamified ? <Gamified setGamified={setGamified}/> : <Portfolio setGamified={setGamified}/> }
    </div>
  );
}

export default App;
