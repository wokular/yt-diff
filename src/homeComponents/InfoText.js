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
         <h2 className="infoTextStyle">{text}</h2>
      </div>
   )

}

export default InfoText