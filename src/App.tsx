import { useState, lazy, Suspense, useEffect } from 'react';

import Portfolio from "./pages/Portfolio/Portfolio";
import LoadingSpace from './components/Gamified/LoadingSpace/LoadingSpace.style';

const Gamified = lazy(() => import("./pages/Gamified/Gamified"));

function App() {
  const [gamified, setGamified] = useState(false);

  //remove class that prevents transitions from working while page loading
  useEffect(() => {
    setTimeout(() => {
      let node = document.querySelector('.preload-transitions');
      node?.classList.remove('preload-transitions');
    }, 60); 

  }, []);

  return (
    <div className="App preload-transitions">
      { gamified ? <Suspense fallback={<LoadingSpace/>}><Gamified setGamified={setGamified}/></Suspense> : <Portfolio setGamified={setGamified}/> }
    </div>
  );
}

export default App;
