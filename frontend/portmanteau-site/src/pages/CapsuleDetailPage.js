import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// api
import portmanteauAPI from "../api/portmanteauAPI"

// components
import CapsuleDetails from "../components/CapsuleDetails";

const CapsuleDetailPage = (props) => {
  // states
  const [capsuleDetails, setCapsuleDetails] = useState(null)

  // router props
  const params = useParams()

  // effects
  useEffect(()=> {
    const getCapsuleDetails = async () => {
      const data = await portmanteauAPI.fetchCapsuleDetails(params.capsuleID)
      if (data) {
        setCapsuleDetails(data)
      }
    }
    getCapsuleDetails();
  }, [])


  // renders
  return (
    <div>
      <h2>Capsule Details</h2>
      <hr/>
      <p>It's (insert weather here) today! Would you like your (insert clothing items here)?</p>
      <hr />
      {capsuleDetails && <Link to={`/capsule-list/${params.capsuleID}/item-detail/create`}><button >Add an Item</button></Link>}
      { capsuleDetails && <CapsuleDetails capsuleDetails={capsuleDetails}/> }


    </div>
  )
}

export default CapsuleDetailPage;