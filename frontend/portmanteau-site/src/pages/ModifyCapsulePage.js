import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// api
import portmanteauAPI from '../api/portmanteauAPI';

function ModifyCapsulePage(props) {

  // router props
  const params = useParams()
  const navigate = useNavigate()

  // state
  const [initialCapsule, setInitialCapsule] = useState(null)
  const [users, setUsers] = useState([])


  // effects
  
  useEffect(()=> {
    const getCapsuleDetails = async () => {
      const data = await portmanteauAPI.fetchCapsuleDetails(params.capsuleID)
      if (data) {
        setInitialCapsule(data)
      }
      } 
      if (params.capsuleID) {
        getCapsuleDetails(); 
      }
    }, [])

    useEffect(()=> {
      const getUsers = async () => {
        const data = await portmanteauAPI.fetchUsers()
        if (data) {
          setUsers(data)
        }
        } 
        getUsers(); 
      }, [])
  
  // derived values
  const action = initialCapsule ? "Update" : "Create"

  // handlers
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    const capsuleObj = {
      "name": event.target.elements[0].value,
      "description": event.target.elements[1].value,
      "user": event.target.elements[2].value,
      // will eventually substitute this with the logged-in user

    } 
   
    // POST/PUT request
    const data =  initialCapsule
      ? await portmanteauAPI.updateCapsule(capsuleObj, initialCapsule.id)
      : await portmanteauAPI.addCapsule(capsuleObj)
    if (data) {
      navigate(`capsule-list/${params.capsuleID}`) 
    }
  }

  // render helpers
  const renderUsers = () => {
    let elems = users.map((user, index) => {
      return (
        <option key={index}>{user.username}</option>
      )
    })
    return elems
  }
  
  // renders
  return (
    <div>
      <h2>{action} a Capsule</h2>
      <hr />
      <form onSubmit={handleFormSubmit}>
        <label>Name: </label>
        <input name='name' placeholder='ie. Winter' defaultValue={initialCapsule ? initialCapsule.name : ""}></input>
        <br />
        <label>Description: </label>
        <input name='description' placeholder='Any notes you would like for your capsule go here.' defaultValue={initialCapsule? initialCapsule.description : ""}></input>
        <br />
        <label>User: </label>
        <select name="user" placeholder='User' defaultValue={initialCapsule ? initialCapsule.user : ""}>
          {renderUsers()}
        </select>
        <br />
        <button type="submit">{action} Capsule</button>
      </form>
    </div>
  )
}

// will eventually substitute the 'user' portion of the form with just the logged in user.

export default ModifyCapsulePage;