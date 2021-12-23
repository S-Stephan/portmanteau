import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// api
import portmanteauAPI from '../api/portmanteauAPI';

function ModifyItemPage(props) {
  const { url, setUrl } = props
  // states
  const [initialItem, setInitialItem] = useState(null)
  const [types, setTypes] = useState([])
  const [weathers, setWeathers] = useState([])
  const [image, setImage] = useState([])
  
  
  const firstUpdate = useRef(true)

  useEffect(()=> {
     if (firstUpdate.current) {
      firstUpdate.current = false
      return;
     }

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
    console.log(url)
    console.log(event.target)
    const itemObj = {
      // "color-pattern": event.target.elements[0].value,
      // "brand": event.target.elements[1].value,
      // "type": event.target.elements[2].value,
      // "weather": event.target.elements[3].value,
      // "capsule": params.capsuleID,
      // "image_url": url
      
      capsule: "capsule4",
      type: "type2",
      weather: "weather3",
      color_pattern: "color0" ,
      brand: "brand1",
      image_url: "url",


    } 
    // POST/PUT request
    const data = await portmanteauAPI.addItem(itemObj)
    console.log(data)
    //const data =  initialItem
      //? await portmanteauAPI.updateItem(itemObj, initialItem.id)
      //: await portmanteauAPI.addItem(itemObj)
    if (data) {
      navigate(`capsule-list/${params.capsuleID}/item-detail/${params.itemID}`) 
    }
  }; 


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
        <input name='color_pattern' placeholder='ie. blue polka dot' defaultValue={initialItem && initialItem.color_pattern}></input>
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
        <input name="image_url" type="file" id="file-input" onChange={e => setImage(e.target.files[0])} placeholder="Upload Photo" defaultValue={initialItem && initialItem.photo_url} />
        <br />
        <button type="submit" onClick={handleFormSubmit}>{action} Item</button>
      </form>
    </div>
  )
}

export default ModifyItemPage;