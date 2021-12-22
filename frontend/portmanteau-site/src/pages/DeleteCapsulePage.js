import { useNavigate, useParams } from 'react-router-dom';

//api
import portmanteauAPI from "../api/portmanteauAPI"

function DeleteCapsule(props) {
  // params
  const params = useParams()
  const navigate = useNavigate()

  // handler
  const deleteCapsule = async () => {
    const data = await portmanteauAPI.deleteCapsule(params.capsuleID)
    if (data) {
      navigate(`/capsule-list/`)   
    }
  }

    return (
      <div>
        <p>Are you sure you want to delete this capsule?</p>
        <button onClick={deleteCapsule}>Yes</button>
        <button onClick={() => {navigate(`/capsule-list/${params.capsuleID}`)} }>No</button>
      </div>
    )
 
}

export default DeleteCapsule;