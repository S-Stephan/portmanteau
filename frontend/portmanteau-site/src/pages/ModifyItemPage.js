import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// api
import portmanteauAPI from '../api/portmanteauAPI';

function ModifyItemPage(props) {
  // states
  //const [types, setTypes] = useState(null)
  //const [weathers, setWeathers] = useState(null)

  // router props
  const params = useParams()
  const navigate = useNavigate()


  // handlers
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    const itemObj = {
      "color-pattern": event.target.elements[0].value,
      "brand": event.target.elements[1].value,
      "type": event.target.elements[2].value,
      "weather": event.target.elements[3].value,
      "capsule": params.capsuleID

    } 

    const data =  await portmanteauAPI.addItem(itemObj)
    if (data) {
      navigate(`capsule-list/${params.capsuleID}/item-detail/${params.itemID}`) 
    }

  }

  // renders
  return (
    <div>
      <h2>Add an Item</h2>
      <hr />
      <form onSubmit={handleFormSubmit}>
        <label>Color/Pattern: </label>
        <input name='color-pattern' placeholder='ie. blue polka dot'></input>
        <br />
        <label>Brand: </label>
        <input name='brand' placeholder='ie. Old Navy'></input>
        <br />
        <label>Type: </label>
        <select name="type">
          <option>Get the type options from the backend</option>
        </select>
        <br />
        <label>Weather: </label>
        <select name="weather">
          <option>Get the weather options from the backend</option>
        </select>
        <br />
        <p>Photo upload functionality will go here</p>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ModifyItemPage;