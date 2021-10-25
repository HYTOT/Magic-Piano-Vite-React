import React, { useState, useEffect } from 'react'
import Constants from '../../constants'
import './index.less'

const Piano: React.FC = () => {

  const [activeKeys, setActiveKeys] = useState<Array<string>>([])
  // const [playingAudios, setPlayingAudios] = useState<Array<string>>([])

  /** 按下钢琴键 */
  const addActiveKey = (key: string) => {
    setActiveKeys(keys => {
      const tempKeys = [...keys]
      tempKeys.includes(key) && tempKeys.splice(tempKeys.indexOf(key), 1)
      tempKeys.push(key)
      return tempKeys
    })
  }
  /** 松开钢琴键 */
  const removeActiveKey = (key: string) => {
    setActiveKeys(keys => {
      const tempKeys = [...keys]
      tempKeys.includes(key) && tempKeys.splice(tempKeys.indexOf(key), 1)
      return tempKeys
    })
  }
  /** 注册键盘按键按下事件 */
  const registerKeyDownHandler = () => {
    document.onkeydown = ({ key }: KeyboardEvent) => {
      if (Constants.PIANO_BUTTONS.includes(key)) {
        addActiveKey(key)
      }
    }
  }
  /** 注册键盘按键松开事件 */
  const registerKeyUpHandler = () => {
    document.onkeyup = ({ key }: KeyboardEvent) => {
      removeActiveKey(key)
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
          // 钢琴键按钮
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
        // 钢琴音对应 audio 标签
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
