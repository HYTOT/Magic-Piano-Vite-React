import React from 'react'
import Piano from './components/Piano'
// import MusicScore from './components/MusicScore'
import './App.less'

const App: React.FC = () => {

  return (
    <div className="App">
      <Piano/>
      {/* <MusicScore/> */}
    </div>
  )

}

export default App
