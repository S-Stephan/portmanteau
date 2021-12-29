const tryCatchFetch = async (url, init = null) => {
  try {
    const response = await fetch(url, init)
    if (response.ok) {
      if (response.status !== 204 ) {
        return await response.json()
      } else {
        return response
      }
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

const fetchItems = async () => {
  let url = BASE_URL + "item/"
  return await tryCatchFetch(url)
}

const fetchTypes = async () => {
  let url = BASE_URL + "type/"
  return await tryCatchFetch(url)
}

const fetchWeather = async () => {
  let url = BASE_URL + "weather/"
  return await tryCatchFetch(url)
}

const fetchUsers = async () => {
  let url = BASE_URL + "user/"
  return await tryCatchFetch(url)
}


const fetchItemDetails = async (id) => {
  let url = BASE_URL + `item/${id}/`
  return await tryCatchFetch(url)
}

const addCapsule = async (capsuleObj) => {
  let url = BASE_URL + `capsule/`
  const paramsObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(capsuleObj) 
  }
  return await tryCatchFetch(url, paramsObj)
}

const updateCapsule = async (capsuleObj, id) => {
  const url = BASE_URL + `capsule/${id}/`
  const paramsObj = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(capsuleObj)
  }
  return await tryCatchFetch(url, paramsObj)
}

const deleteCapsule = async (id) => {
  let url = BASE_URL + `capsule/${id}`
  const paramsObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }
  return await tryCatchFetch(url, paramsObj)
}

const addItem = async (itemObj) => {
  let url = BASE_URL + "item/"
  const paramsObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(itemObj) 
  }
  return await tryCatchFetch(url, paramsObj)
}

const updateItem = async (itemObj, id) => {
  const url = BASE_URL + `item/${id}/`
  const paramsObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(itemObj)
  }
  return await tryCatchFetch(url, paramsObj)
}


const deleteItem = async (id) => {
  let url = BASE_URL + `item/${id}`
  const paramsObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }
  return await tryCatchFetch(url, paramsObj)
}


const exportFunctions = {
  fetchCapsules,
  fetchCapsuleDetails,
  fetchItems,
  fetchTypes,
  fetchWeather,
  fetchUsers,
  fetchItemDetails,
  addCapsule,
  updateCapsule,
  deleteCapsule,
  addItem,
  updateItem,
  deleteItem
}

export default exportFunctions;