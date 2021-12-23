import React, { react, useState, useEffect } from 'react'
import InfoText from './homeComponents/InfoText'
import ImageSlide from './homeComponents/ImageSlide'
import infoData from './infoData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

function Home() {

   const [loading, setLoading] = useState(false)
   const [infoIndex, setInfoIndex] = useState(0)
   const [turn, setTurn] = useState(0)
   const [turnImg, setTurnImg] = useState(0)
   const [imgIndex, setImg] = useState(0)
   const [prevImgIndex, setPrevImg] = useState(4)
   const imgCount = 5;
   const [btnPressed, setBtnPressed] = useState("right")


   // Question: does having two useState functions called once after another in 2 lines rerender twice, causing the second one to render differently? Should I use let instead of a useState for prevImgIndex?

   const imgArr = ["img1.jpeg", "img2.jpeg", "img3.jpeg", "img4.jpeg", "img5.jpeg"];

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

   // Reset this when the image changes because we want to wait 5 seconds after if user hits it
   useEffect(() => {
      let imgInterval = setInterval(() => {
         setBtnPressed("right")
         // Iterates over the image indexes
         if (imgIndex == imgCount - 1) {
            console.log('Reset image to 0');
            setPrevImg(imgCount - 1)
            setImg(0)
         } else {
            setPrevImg(imgIndex)
            setImg(cur => {
               console.log("Increase image to " + (cur + 1));
               return cur + 1;
            })
         }
         setTurnImg(curTurn => {
            return curTurn + 1;
         })
      }, 4000);
      return () => {
         clearInterval(imgInterval);
      };
   }, [imgIndex])


   // Button functionality for image slider
   function btnLeft() {
      setBtnPressed("left")
      if (imgIndex == 0) {
         // Set it to max
         setPrevImg(imgIndex)
         setImg(imgCount - 1)
      } else {
         // Just set it minus 1 of current
         setPrevImg(imgIndex)
         setImg(cur => {
            return cur - 1;
         })
      }
   }

   function btnRight() {
      setBtnPressed("right")
      if (imgIndex == imgCount - 1) {
         setPrevImg(imgIndex)
         setImg(0)
      } else {
         setPrevImg(imgIndex)
         setImg(cur => {
            return cur + 1;
         })
      }
   }

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
            <div className="topRightCont">
               <div className="imgParCont">
                  {
                     // One image component
                     (btnPressed == "left") ? 
                        (imgIndex == imgCount - 1) ?
                           <ImageSlide side={'l'} comeIn={false} imgNum={0}></ImageSlide> :
                           <ImageSlide side={'l'} comeIn={false} imgNum={prevImgIndex}></ImageSlide> :
                        <ImageSlide side={'l'} comeIn={true} imgNum={imgIndex}></ImageSlide>
                  }
                  {
                     // Two image component
                     (btnPressed == "right") ? 
                        (imgIndex == 0) ?
                           <ImageSlide side={'r'} comeIn={false} imgNum={imgCount - 1}></ImageSlide> :
                           <ImageSlide side={'r'} comeIn={false} imgNum={prevImgIndex}></ImageSlide> :
                        <ImageSlide side={'r'} comeIn={true} imgNum={imgIndex}></ImageSlide>
                  }
               </div>

               <div className="captBarCont">
                  <div className="captBar">
                     <h1 className="captBarText">Here is the caption</h1>
                  </div>
               </div>

               <div className="arrowCont">
                  <button onClick={btnLeft} className="arrowBtn arrLeft">
                     <FontAwesomeIcon icon={faArrowLeft} className="faArr arrSvgL" />
                  </button>
                  <button onClick={btnRight} className="arrowBtn arrRight">
                     <FontAwesomeIcon icon={faArrowRight} className="faArr arrSvgR" />
                  </button>
               </div>

               <div className="imgNumCont">
                  <div className="imgNum">
                     <h3>1 / 5</h3>
                  </div>
               </div>

            </div>
         </section>

      </main>
   )
}

export default Home