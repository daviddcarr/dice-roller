import { Suspense } from 'react'

import './App.css'

import Scene from './components/Scene'
import Loading from './components/Loading'

function App() {
  return (
    <div className="fixed inset-0 bg-gray-900">

      <Suspense fallback={<Loading />}>
        <Scene />
      </Suspense>

    </div>
  );
}

export default App;
