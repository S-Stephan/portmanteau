import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// api
import portmanteauAPI from "../api/portmanteauAPI"

// components
import ItemDetails from "../components/ItemDetails";

const ItemDetailPage = (props) => {
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
      <h2>Item Details</h2>
      <hr />
      { itemDetails && <ItemDetails itemDetails={itemDetails}/> }
      <span>
        { itemDetails && <Link to={`/capsule-list/${params.capsuleID}/item-detail/${params.itemID}/update`}><button>Edit Item</button></Link> }
        { itemDetails && <Link to={`/capsule-list/${params.capsuleID}/item-detail/${params.itemID}/delete`}><button>Delete Item</button></Link>}
      </span>
    </div>
  )
}

export default ItemDetailPage;