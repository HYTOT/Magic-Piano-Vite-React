import React, { useState, useEffect } from 'react'
import Constants from '../../constants'
import './index.less'

const Piano: React.FC = () => {

  const [activeKeys, setActiveKeys] = useState<Array<string>>([])

  const registerKeyDownHandler = () => {
    document.onkeydown = ({ key }: KeyboardEvent) => {
      if (Constants.PIANO_BUTTONS.includes(key)) {
        setActiveKeys(keys => {
          const tempKeys = [...keys]
          tempKeys.includes(key) && tempKeys.splice(tempKeys.indexOf(key), 1)
          tempKeys.push(key)
          return tempKeys
        })
      }
    }
  }
  const registerKeyUpHandler = () => {
    document.onkeyup = ({ key }: KeyboardEvent) => {
      setActiveKeys(keys => {
        const tempKeys = [...keys]
        tempKeys.includes(key) && tempKeys.splice(tempKeys.indexOf(key), 1)
        return tempKeys
      })
    }
  }

  useEffect(() => {
    registerKeyDownHandler()
    registerKeyUpHandler()
  }, [])

  return (
    <div className="piano">
      <div className="buttons">
        {
          Constants.PIANO_BUTTONS.map((key) => (
            <div
              key={ key }
              className={ `button ${activeKeys.includes(key) ? 'active' : ''}` }
            >
              <span>{ key }</span>
            </div>
          ))
        }
      </div>
      {
        activeKeys.map(key => {
          const fileName = Constants.PIANO_BUTTONS.indexOf(key) + 1
          return fileName > 0 && fileName <= 21 && (
            <audio
              key={ key }
              src={ `mp3/${fileName}.mp3` }
              autoPlay
            />
          )
        })
      }
    </div>
  )

}

export default Piano
