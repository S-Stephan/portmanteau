
function ItemDetails(props) {
  
  //renders
  return (
    <div>
       <h3>Type: { props.itemDetails.type }</h3>
       <h3>Color/Pattern: { props.itemDetails.color_pattern }</h3>
       <h3>Brand: { props.itemDetails.brand }</h3>
        <p>This item is appropriate for: { props.itemDetails.weather }</p>
        <hr/>
        <p>Would you like some color suggestions for your capsule based on this item?</p>
        <button>Click Here!</button>
    </div>
  )
}

export default ItemDetails;