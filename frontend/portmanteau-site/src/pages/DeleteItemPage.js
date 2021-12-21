import { useNavigate, useParams } from 'react-router-dom';

//api
import portmanteauAPI from "../api/portmanteauAPI"

function DeleteItem(props) {
  // params
  const params = useParams()
  const navigate = useNavigate()

  // handler
  const deleteItem = async () => {
    const data = await portmanteauAPI.deleteItem(params.itemID)
    if (data) {
      navigate(`/capsule-list/${params.capsuleID}/`)   
    }
  }

    return (
      <div>
        <p>Are you sure you want to delete this item?</p>
        <button onClick={deleteItem}>Yes</button>
        <button onClick={navigate(`/capsule-list/${params.capsuleID}/item-detail/${params.itemID}`)}>No</button>
      </div>
    )
 
}

export default DeleteItem;