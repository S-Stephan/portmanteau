const tryCatchFetch = async (url, init = null) => {
  try {
    const response = await fetch(url, init)
    if (response.ok) {
      return await response.json()
    }
    else {
      throw new Error(`bad response: ${response.status} ${response.statusText}`) 
    }
  }
  catch (e) {
    console.error(e)
    return null
  }  
}

const BASE_URL = "http://localhost:8000/api/"

const fetchCapsules = async () => {
  let url = BASE_URL + "capsule/"
  return await tryCatchFetch(url)
}

const fetchCapsuleDetails = async (id) => {
  let url = BASE_URL + `capsule/${id}/`
  return await tryCatchFetch(url)
}

const fetchItemDetails = async (id) => {
  let url = BASE_URL + `item/${id}/`
  return await tryCatchFetch(url)
}


const exportFunctions = {
  fetchCapsules,
  fetchCapsuleDetails,
  fetchItemDetails
}

export default exportFunctions;