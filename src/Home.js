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
         <section className='home-section flex w-screen rel-height h-1/4 md:h-1/2'>
            <div className='bg-gray-500 flex-1 w-1/2'>
               <div className="relative grad-bkg h-full w-full">
                  <div className="flex invisible md:visible logo absolute ml-5 mt-5 w-32 h-14 bg-blue-dark shadow-logo blur-sm hover:bg-dark-blurple">
                     <h1 className='flex mx-auto items-center h-full leading-5 font-lato font-light text-center text-2xl tracking-wide text-semi-white'>YT Diff</h1>
                  </div>
                  <div className="align-self w-auto relative top-4 md:top-28 ">
                     <h1 className="text-center sm:drop-shadow-lg text-2xl md:text-3xl lg:text-4xl font-lato font-light tracking-wide text-semi-white">A tool for comparing video playlists on YouTube.</h1>
                  </div>
                  <div className="absolute w-9/12 bottom-8 md:bottom-28 right-2 md:right-8">
                     <div className="h-full w-full">
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
                  </div>
                  <div className="absolute w-9/12 bottom-8 md:bottom-28 right-2 md:right-8">
                     <div className="h-full w-full">
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
            <div className="relative flex-1 w-1/2">
               <div className="ui-element-cont w-1/2 h-1/2">

                  <div className="absolute img-cont w-full h-full">
                     {
                        loading ? <img src="https://fakeimg.pl/720x400/" alt="placeholder" className='fit-img' /> : <img src="/images/img1.jpeg" alt="main img" className='fit-img' />
                     }
                  </div>


                  <div className="absolute z-10 capt-bar h-16 md:h-14 bg-captBar shadow-captBar flex items-center w-full">
                     <div className="caption w-full flex items-center justify-center">
                        <h1 className="text-blue-dark font-light text-2xl text-center">Here is the caption</h1>
                     </div>
                  </div>

                  <div className="absolute arrow-cont z-20 flex justify-center items-center shadow-arrowBox bg-arrowBox  h-5 rounded-xl w-14">
                     <button onClick={btnLeft} className="left-btn w-1/2">
                        <FontAwesomeIcon icon={faArrowLeft} />
                     </button>
                     <button onClick={btnRight} className="right-btn w-1/2">
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