import React from 'react'
import './index.less'

interface I_AsideProps {
  unfold: boolean
}

const Aside: React.FC<I_AsideProps> = ({ unfold }: I_AsideProps) => {

  return (
    <div className={ `aside ${unfold ? 'unfold' : ''}` }>
      
    </div>
  )

}

export default Aside
