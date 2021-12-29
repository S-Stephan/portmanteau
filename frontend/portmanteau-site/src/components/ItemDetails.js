


function ItemDetails(props) {
   
  
  //renders
  return (
    <div >
       <h3>Type: { props.itemDetails.type.name }</h3>
       <h3>Color/Pattern: { props.itemDetails.color_pattern }</h3>
       <h3>Brand: { props.itemDetails.brand }</h3>
        <p>This item is weather-appropriate for: { props.itemDetails.weather.name }</p>
        <img width="200px" src={ props.itemDetails.image_url }></img>
    </div>
  )
}

export default ItemDetails;