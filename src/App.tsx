import { useState, lazy, Suspense } from 'react';

import Portfolio from "./pages/Portfolio/Portfolio";
import LoadingSpace from './components/Normal/LoadingSpace/LoadingSpace.style';

const Gamified = lazy(() => import("./pages/Gamified/Gamified"));

function App() {
  const [gamified, setGamified] = useState(false);

  return (
    <div className="App">
      { gamified ? <Suspense fallback={<LoadingSpace/>}><Gamified setGamified={setGamified}/></Suspense> : <Portfolio setGamified={setGamified}/> }
    </div>
  );
}

export default App;
