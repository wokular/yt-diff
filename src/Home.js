import React, { react, useState, useEffect } from 'react'
import InfoText from './homeComponents/InfoText'
import infoData from './infoData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

function Home() {

   const [loading, setLoading] = useState(false)
   const [infoIndex, setInfoIndex] = useState(0)
   const [turn, setTurn] = useState(0)
   const [imgIndex, setImg] = useState(0)
   const imgCount = 5;

   useEffect(() => {
      let inter = setInterval(() => {
         // Iterates the indexes of data
         setInfoIndex(curIndex => {
            if (curIndex + 1 > infoData.length - 1) {
               return 0;
            } else {
               return curIndex + 1;
            }

         })
         // Increases the turn count by one
         setTurn(curTurn => {
            return curTurn + 1;
         })
      }, 5000);
      return () => {
         clearInterval(inter);
      };
   }, [])



   // Button functionality for image slider
   function btnLeft() {
      if (imgIndex == 0) {
         // Set it to max
         setImg(imgCount - 1)
      } else {
         // Just set it minus 1 of current
         setImg(cur => {
            return cur - 1;
         })
      }
   }

   function btnRight() {
      if (imgIndex == imgCount - 1) {
         setImg(0)
      } else {
         setImg(cur => {
            return cur + 1;
         })
      }
   }

   console.log(imgIndex);

   return (

      <main>
         <section className='topHalfCont'>
            <div className='topLeftCont'>
               <div className="tlcBkg gradBkg">
                  <div className="logoCont">
                     <h1 className='logoText'>YT Diff</h1>
                  </div>
                  <div className="descCont">
                     <h1 className="descText">A tool for comparing video playlists on YouTube.</h1>
                  </div>
                  <div className="infoTextCont">
                     <div className="infoText1Cont">
                        {
                           // On every even turn, the first one will come in and the second one will stay.
                           // The new one coming in will have the new value, and the one going out will have the last value.
                           // Vice versa for odd
                        }
                        {
                           // If it is it's turn to come in, get current element.
                           ((turn) % 2 == 0) ? <InfoText text={infoData[infoIndex]['info']} comeIn={true}></InfoText> :
                              // If it is not its turn to come in
                              // If the index is 0, get the last element of entire thing
                              ((infoIndex == 0) ? <InfoText text={infoData[infoData.length - 1]['info']} comeIn={false}></InfoText> :
                                 // Otherwise just get the last element
                                 <InfoText text={infoData[infoIndex - 1]['info']} comeIn={false}></InfoText>)
                        }
                     </div>
                     <div className="infoText2Cont">
                        {
                           // If it is it's turn to come in, get current element.
                           ((turn) % 2 == 1) ? <InfoText text={infoData[infoIndex]['info']} comeIn={true}></InfoText> :
                              // If it is not its turn to come in
                              // If the index is 0, get the last element of entire thing
                              ((infoIndex == 0) ? <InfoText text={infoData[infoData.length - 1]['info']} comeIn={false}></InfoText> :
                                 // Otherwise just get the last element
                                 <InfoText text={infoData[infoIndex - 1]['info']} comeIn={false}></InfoText>)
                        }
                     </div>
                  </div>
               </div>
            </div>
            <div className="blank">
               <div className="blank">

                  <div className="blank">
                     {
                        loading ? <img src="https://fakeimg.pl/720x400/" alt="placeholder" className='fit-img' /> : <img src="/images/img1.jpeg" alt="main img" className='fit-img' />
                     }
                  </div>


                  <div className="blank">
                     <div className="blank">
                        <h1 className="blank">Here is the caption</h1>
                     </div>
                  </div>

                  <div className="blank">
                     <button onClick={btnLeft} className="blank">
                        <FontAwesomeIcon icon={faArrowLeft} />
                     </button>
                     <button onClick={btnRight} className="blank">
                        <FontAwesomeIcon icon={faArrowRight} />
                     </button>
                  </div>

               </div>
            </div>
         </section>

      </main>
   )
}

export default Home