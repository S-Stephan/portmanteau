import { useState, useEffect } from 'react';
import { useParams, useNavigate, useResolvedPath } from 'react-router-dom';

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

  // gets the capsule details and sets the inital capsule value
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

    // gets username information from User model for dropdown
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
      "items": initialCapsule ? initialCapsule.items.map(elem => elem.id) : []
      // will eventually substitute this with the logged-in user

    } 
   
    // POST/PUT request
    const data =  initialCapsule
      ? await portmanteauAPI.updateCapsule(capsuleObj, initialCapsule.id)
      : await portmanteauAPI.addCapsule(capsuleObj)
      console.log(capsuleObj)
    if (data) {
      console.log("Data:", data)
      navigate(`/capsule-list/${data.id}`) 
    }
  }

  // render helpers
  const renderUsers = (defaultValue) => {
    //console.log(users)
    let elems = users.map((user, index) => {
      return (
        defaultValue === user.id
        ? <option key={index} value={user.id} selected>{user.username}</option>
        : <option key={index} value={user.id}>{user.username}</option>
      )
    })
    return elems
  }
  
  // renders
  return (
    <div>
      <h2>{action} a Capsule</h2>
      <hr />
      <form className="form-style-1" onSubmit={handleFormSubmit}>
        <label>Name: </label>
        <input name='name' placeholder='ie. Winter' defaultValue={initialCapsule ? initialCapsule.name : ""}></input>
        <br />
        <label>Description: </label>
        <input name='description' placeholder='Any notes for this capsule go here.' defaultValue={initialCapsule? initialCapsule.description : ""}></input>
        <br />
        <label>User: </label>
        <select name="user" placeholder='User'>
          {renderUsers(initialCapsule && initialCapsule.username)}
        </select>
        <br />
        <button type="submit">{action} Capsule</button>
      </form>
    </div>
  )
}

// will eventually substitute the 'user' portion of the form with just the logged in user.

export default ModifyCapsulePage;