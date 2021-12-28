import { Link } from 'react-router-dom';

function CapsuleDetails(props) {
  //render helper
  const renderItems = (items) => {
    return items.map((item, index) => {
      return (
        <li key={index}>
        <Link to={`/capsule-list/${item.capsule}/item-detail/${ item.id }`}>{ item.color_pattern + " " + item.type }</Link></li>
        )
    })
  }
  //renders
  return (
    <div>
       <h3>{ props.capsuleDetails.name }</h3>
        <p id="description">{ props.capsuleDetails.description }</p>
        <ul>
          { renderItems(props.capsuleDetails.items) }
        </ul>
    </div>
  )
}

export default CapsuleDetails;