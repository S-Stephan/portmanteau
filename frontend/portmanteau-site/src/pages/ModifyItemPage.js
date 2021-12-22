import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// api
import portmanteauAPI from '../api/portmanteauAPI';

function ModifyItemPage(props) {
  // states
  const [initialItem, setInitialItem] = useState(null)
  const [types, setTypes] = useState([])
  const [weathers, setWeathers] = useState([])

  // router props
  const params = useParams()
  const navigate = useNavigate()

  // effects
  useEffect(()=> {
    const getItemDetails = async () => {
      const data = await portmanteauAPI.fetchItemDetails(params.itemID)
      if (data) {
        setInitialItem(data)
      }
    }
    if (params.itemID) {
      getItemDetails();
      }
  }, [params.itemID])

  useEffect(()=> {
    const getTypes = async () => {
      const data = await portmanteauAPI.fetchTypes()
      if (data) {
        setTypes(data)
      }
    }
    getTypes();
  }, [])

  useEffect(()=> {
    const getWeathers = async () => {
      const data = await portmanteauAPI.fetchWeather()
      if (data) {
        setWeathers(data)
      }
    }
    getWeathers();
  }, [])


  // derived values
  const action = initialItem ? "Update" : "Create"


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
    // PUT request
    const data =  initialItem
      ? await portmanteauAPI.updateItem(itemObj, initialItem.id)
      : await portmanteauAPI.addItem(itemObj)
    if (data) {
      navigate(`capsule-list/${params.capsuleID}/item-detail/${params.itemID}`) 
    }

  }

  
  // render helpers
  const renderTypes = () => {
    let elems = types.map((type, index) => {
      return (
        <option key={index}>{type.name}</option>
      )
    })
    return elems
  }

  const renderWeather = () => {
    let elems = weathers.map((weather, index) => {
      return (
        <option key={index}>{weather.name}</option>
      )
    })
    return elems
  }
  // renders
  return (
    <div>
      <h2>{action} an Item</h2>
      <hr />
      <form onSubmit={handleFormSubmit}>
        <label>Color/Pattern: </label>
        <input name='color-pattern' placeholder='ie. blue polka dot' defaultValue={initialItem && initialItem.color_pattern}></input>
        <br />
        <label>Brand: </label>
        <input name='brand' placeholder='ie. Old Navy' defaultValue={initialItem && initialItem.brand}></input>
        <br />
        <label>Type: </label>
        <select name="type" placeholder='Type' defaultValue={initialItem && initialItem.type}>
          { renderTypes() }
        </select>
        <br />
        <label>Weather: </label>
        <select name="weather" placeholder='Weather' defaultValue={initialItem && initialItem.weather}>
          { renderWeather() }
        </select>
        <br />
        <p>Photo upload functionality will go here</p>
        <br />
        <button type="submit">{action} Item</button>
      </form>
    </div>
  )
}

export default ModifyItemPage;