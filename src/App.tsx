import React, { useState } from 'react'
import Piano from './components/Piano'
import Aside from './components/Aside'
// import MusicScore from './components/MusicScore'
import './App.less'

const App: React.FC = () => {

  const [asideUnfold, setAsideUnfold] = useState(false)

  return (
    <div className="App">
      <Piano/>
      <Aside unfold={ asideUnfold }/>
      {/* <MusicScore/> */}
    </div>
  )

}

export default App
