import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// api
import portmanteauAPI from '../api/portmanteauAPI';

function ModifyItemPage(props) {
  // states
  const [initialItem, setInitialItem] = useState(null)
  const [types, setTypes] = useState([])
  const [weathers, setWeathers] = useState([])
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState("")
  
  const firstUpdate = useRef(true)

  useEffect(()=> {
     if (firstUpdate.current) {
      firstUpdate.current = false
      return;
     }
    
    // fetch image url 
    const uploadImage = async () => {
      try {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "s_images");
        data.append("cloud_name", "s-stephan1");
        const fetchData = await fetch("https://api.cloudinary.com/v1_1/s-stephan1/image/upload", {
          method: "POST",
          body: data,
        });
        const response = await fetchData.json();
        setUrl(response.url)

      } catch (e) {
        console.log(e);
      }
    }; 
    uploadImage(); 
  }, [image])


  // router props
  const params = useParams()
  const navigate = useNavigate()

  // effects
  // gets item details from backend
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

  // fetches clothing types for dropdown
  useEffect(()=> {
    const getTypes = async () => {
      const data = await portmanteauAPI.fetchTypes()
      if (data) {
        setTypes(data)
      }
    }
    getTypes();
  }, [])

  // fetches weather for dropdown
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

  // if an initial item exists, use the word 'update' if not, use 'create'
  const action = initialItem ? "Update" : "Create"


  // handlers

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    
    
    const itemObj = {
      capsule: params.capsuleID,
      type: event.target.elements[2].value,
      weather: event.target.elements[3].value,
      color_pattern: event.target.elements[0].value,
      brand: event.target.elements[1].value,
      image_url: initialItem ? initialItem.image_url : url
      
    } 
    
    // POST/PUT request
    console.log(itemObj)
    const data =  initialItem ? await portmanteauAPI.updateItem(itemObj, initialItem.id) : await portmanteauAPI.addItem(itemObj)
    
    if (data) {
      navigate(`/capsule-list/${params.capsuleID}`) 
    }
  }; 


  // render helpers
  const renderTypes = (defaultValue) => {
    let elems = types.map((type, index) => {
      return (
        defaultValue === type.id 
        ? <option key={index} value={type.id} selected>{type.name}</option>
        : <option key={index} value={type.id}>{type.name}</option>

      
      )
    })
    return elems
  }

  const renderWeather = (defaultValue) => {
    let elems = weathers.map((weather, index) => {
      return (
        defaultValue === weather.id
        ? <option key={index} value={weather.id} selected>{weather.name}</option>
        : <option key={index} value={weather.id}>{weather.name}</option>
      )
    })
    return elems
  }

  // renders
  return (
    <div>
      <h2>{action} an Item</h2>
      <hr />
      <form className="form-style-1" onSubmit={handleFormSubmit}>
        <label>Color/Pattern: </label>
        <input name='color_pattern' placeholder='ie. blue polka dot' defaultValue={initialItem && initialItem.color_pattern}></input>
        <br />
        <label>Brand: </label>
        <input name='brand' placeholder='ie. Old Navy' defaultValue={initialItem && initialItem.brand}></input>
        <br />
        <label>Type: </label>
        <select name="type" placeholder='Type' >
          { renderTypes(initialItem && initialItem.type.id) }
        </select>
        <br />
        <label>Weather: </label>
        <select name="weather" placeholder='Weather'>
          { renderWeather(initialItem && initialItem.weather.id) }
        </select>
        <br />
        <label className="cusotm-upload"><input name="image_url" type="file" id="file-input" onChange={e => setImage(e.target.files[0])} placeholder="Upload Photo" defaultValue={initialItem && initialItem.image_url} />Click me to Upload Photo</label>
        <br />
        <button type="submit">{action} Item</button>
      </form>
    </div>
  )
}

export default ModifyItemPage;