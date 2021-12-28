
function ItemDetails(props) {
  const { url } = props
  
  //renders
  return (
    <div >
       <h3>Type: { props.itemDetails.type }</h3>
       <h3>Color/Pattern: { props.itemDetails.color_pattern }</h3>
       <h3>Brand: { props.itemDetails.brand }</h3>
        <p>This item is weather-appropriate for: { props.itemDetails.weather }</p>
        <img width="200px" src={ url }></img>
    </div>
  )
}

export default ItemDetails;