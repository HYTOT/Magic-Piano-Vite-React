import React, { useState, useEffect } from 'react'
import Constants from '../../constants'
import './index.less'

const Piano: React.FC = () => {

  const [timer, setTimer] = useState(0)
  const [keyboardMode, setKeyboardMode] = useState(true)
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
  /** 注册按键文案模式定时器 */
  const registerKeyboardModeSwitcher = () => {
    setKeyboardMode(flag => !flag)
    timer || setTimer(setTimeout(registerKeyboardModeSwitcher, 5000))
  }

  useEffect(() => {
    registerKeyDownHandler()
    registerKeyUpHandler()
    setTimeout(registerKeyboardModeSwitcher, 5000)
    return () => {
      timer && clearTimeout(timer)
    }
  }, [])

  return (
    <div className="piano">
      <div className={ `navigation ${activeKeys.length ? 'active' : ''}` }>
        <div className="container">
          <div className="title">Magic Piano</div>
          <div className="info">developed by Ajax</div>
        </div>
      </div>
      <div className="buttons">
        {
          // 钢琴键按钮
          Constants.PIANO_BUTTONS.map((key, index) => (
            <div
              key={ key }
              className={ `button ${activeKeys.includes(key) ? 'active' : ''}` }
            >
              {/* 简谱字符 */}
              <span
                className={ `
                  ${keyboardMode ? 'hide' : ''}
                  ${index < 7 ? 'bottom-point' : ''}
                  ${index >= 14 ? 'top-point' : ''}
                ` }
              >
                { index % 7 + 1 }
              </span>
              {/* 键盘按键 */}
              <span className={ `${keyboardMode ? '' : 'hide'}` }>
                { key }
              </span>
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
              src={ `/mp3/${fileName}.mp3` }
              autoPlay
            />
          )
        })
      }
    </div>
  )

}

export default Piano
