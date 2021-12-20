import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
  }, [])


  // renders
  return (
    <div>
      <h2>Item Details</h2>
      <hr />
      { itemDetails && <ItemDetails itemDetails={itemDetails}/> }

    </div>
  )
}

export default ItemDetailPage;