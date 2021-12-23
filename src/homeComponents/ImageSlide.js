import { react, useState, useEffect } from 'react'
import "animate.css"

const ImageSlide = (props) => {

   return (
      (props.side == "l") ?
         (props.comeIn) ?
            <div className='imgPar animate__animated animate__slideInLeft'>
               <img src={`/images/img${props.imgNum + 1}.jpeg`} alt="image showing product" className="fitImg" />
            </div>
            :
            <div className='imgPar animate__animated animate__slideOutLeft'>
               <img src={`/images/img${props.imgNum + 1}.jpeg`} alt="image showing product" className="fitImg" />
            </div>
         :
         (props.comeIn) ?
            <div className='imgPar animate__animated animate__slideInRight'>
               <img src={`/images/img${props.imgNum + 1}.jpeg`} alt="image showing product" className="fitImg" />
            </div>
            :
            <div className='imgPar animate__animated animate__slideOutRight'>
               <img src={`/images/img${props.imgNum + 1}.jpeg`} alt="image showing product" className="fitImg" />
            </div>
   )

}

export default ImageSlide