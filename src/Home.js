import React, { react, useState, useEffect, useMemo } from 'react'
import debounce from 'lodash.debounce'
import InfoText from './homeComponents/InfoText'
import ImgCap from './imgCap'
import ImageSlide from './homeComponents/ImageSlide'
import BarItem from './homeComponents/barItem'
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
   const [btnPressed, setBtnPressed] = useState("right")
   const imgCount = 5;

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
      setTurnImg(num => {
         return num += 1;
      })

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
      setTurnImg(num => {
         return num += 1;
      })

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

                     // If its turn to come in
                     (turnImg % 2 == 0) ?
                        // If btn pressed was left side
                        (btnPressed == "left") ?
                           // Come in from the left, because the user wants the images to go to right, and more content from the left
                           <ImageSlide anim="slideInLeft" imgNum={imgIndex}></ImageSlide>
                           :
                           // Come in from the right, because the user wants the images to go to left, and more content from the right
                           <ImageSlide anim="slideInRight" imgNum={imgIndex}></ImageSlide>
                        :
                        (btnPressed == "left") ?
                           // Leave to the right because content is coming from the left from left btn push
                           <ImageSlide anim="slideOutRight" imgNum={prevImgIndex}></ImageSlide>
                           :
                           // Leave to the left because content is coming from the right from right btn push
                           <ImageSlide anim="slideOutLeft" imgNum={prevImgIndex}></ImageSlide>


                  }
                  {

                     // Same logic from above, but turns are swapped
                     (turnImg % 2 == 1) ?
                        (btnPressed == "left") ?
                           <ImageSlide anim="slideInLeft" imgNum={imgIndex}></ImageSlide>
                           :
                           <ImageSlide anim="slideInRight" imgNum={imgIndex}></ImageSlide>
                        :
                        (btnPressed == "left") ?
                           <ImageSlide anim="slideOutRight" imgNum={prevImgIndex}></ImageSlide>
                           :
                           <ImageSlide anim="slideOutLeft" imgNum={prevImgIndex}></ImageSlide>


                  }
               </div>

               <div className="captBarCont">
                  <div className="captBar">
                     <h1 className="captBarText">
                        {
                           ImgCap[imgIndex]['caption']
                        }
                     </h1>
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
                  <h2 className="imgNum">{imgIndex + 1} / 5</h2>
               </div>

            </div>
         </section>
         <section className="btmHalfCont">
            <div className="startCont">
               <div className="startBtnCont">
                  <button className="startBtn" onClick={() => {console.log("Hello")}}>
                     <span className="startBtnBkg">Hit Start!</span>
                  </button>
               </div>
            </div>
            <div className="btmBarCont">
               <div className="btmBarElementCont">
                  <BarItem to="/terms">Terms</BarItem>
                  <BarItem to="/contact">Contact</BarItem>
                  <BarItem>© Helmet</BarItem>
                  <BarItem to="/about">About</BarItem>
                  <BarItem to="/privacy">Privacy</BarItem>
               </div>
            </div>
         </section>

      </main>
   )
}

export default Home