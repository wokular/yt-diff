import { react } from 'react'

const barItem = (props) => {


   return (

      props.to ? <h2 className="infoTextStyle barTextEle"><a className="infoTextStyle barTextEleLink barTextEle" href={props.to}>{props.children}</a></h2> : <h2 className="infoTextStyle barTextEle">{props.children}</h2>

   )

}

export default barItem