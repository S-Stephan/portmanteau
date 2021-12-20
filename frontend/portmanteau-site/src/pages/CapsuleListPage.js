import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// api
import portmanteauAPI from "../api/portmanteauAPI"

function CapsuleListPage(props){
  // states
  const [capsules, setCapsules] = useState([])

  // effects
  useEffect(()=> {
    const getCapsules = async () => {
      const data = await portmanteauAPI.fetchCapsules()
      if (data) {
        setCapsules(data)
      }
    }
    getCapsules();
  }, [])

  // render helpers
  const renderCapsules = () => {
    let elems = capsules.map((capsule, index) => {
      return (
        <li key={index}><Link to={`/capsule-list/${capsule.id}`}>{ capsule.name }</Link></li>
      )
    })
    return elems
  }

  // renders
  return (
    <div>
      <h2>All Capsules</h2>
      <hr />
      <ul>
        { renderCapsules() }
      </ul>
    </div>
  )
}
  export default CapsuleListPage;