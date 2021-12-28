import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// api
import portmanteauAPI from "../api/portmanteauAPI"

// components
import ItemDetails from "../components/ItemDetails";

const ItemDetailPage = (props) => {
  const { url } = props
  // states
  const [itemDetails, setItemDetails] = useState(null)

  // router props
  const params = useParams()

  // effects
  useEffect(()=> {
    const getItemDetails = async () => {
      const data = await portmanteauAPI.fetchItemDetails(params.itemID)
      if (data) {
        setItemDetails(data)
      }
    }
    getItemDetails();
  }, [params.itemID])


  // renders
  return (
    <div>
      <span className="header-buttons">
        { itemDetails && <Link to={`/capsule-list/${params.capsuleID}/item-detail/${params.itemID}/update`}><button>Edit Item</button></Link> }
        { itemDetails && <Link to={`/capsule-list/${params.capsuleID}/item-detail/${params.itemID}/delete`}><button>Delete Item</button></Link>}
      </span>
      <h2>Item Details</h2>
      <div id="item-details">
        <hr />
        { itemDetails && <ItemDetails itemDetails={itemDetails} url={url}/> }
        <hr/>
      </div>
        <p>Would you like some color suggestions for your capsule based on this item?</p>
        <button>Click Here!</button>
    </div>
  )
}

export default ItemDetailPage;