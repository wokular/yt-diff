import { react, useState, useEffect } from 'react'
import "animate.css"

const InfoText = (props) => {

   const [reset, setReset] = useState(false)

   let text = props.text;
   let comeIn = props.comeIn;

   useEffect(() => {
      // wait 1s then change classnames
      setTimeout(() => {
         if (comeIn) {
            console.log('Set true');
            setReset(true)
         }
      }, 2000);
   }, [])

   return (
      <div className={`animate__animated ${comeIn ? "animate__fadeInRight" : "animate__fadeOutLeft"}`}>
         <h1 className="text-right drop-shadow-xl text-lg md:text-2xl font-lato font-light tracking-wide text-semi-white">{text}</h1>
      </div>
   )

}

export default InfoText