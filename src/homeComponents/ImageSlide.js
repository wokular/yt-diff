import { react, useState, useEffect } from 'react'
import "animate.css"

const ImageSlide = (props) => {

   return (
      <div className={`imgPar animate__animated animate__${props.anim}`}>
         <img src={`/images/img${props.imgNum + 1}.jpeg`} alt="image showing product" className="fitImg" />
      </div>
   )

}

export default ImageSlide