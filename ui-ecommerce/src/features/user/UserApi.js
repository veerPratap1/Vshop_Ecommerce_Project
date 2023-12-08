// A mock function to mimic making an async request for data
export function fetchUserOrderById() {
  return new Promise(async (resolve) =>{
    const response = await fetch("/orders/user/own")
    const data = await response.json()
    resolve({data})
  }
  );
}
export function fetchLogedInUser() {
  return new Promise(async (resolve) =>{
    const response = await fetch(" /api/users/own")
    const data = await response.json()
    resolve({data})
  }
  );
}

export function UpdateUserInfo(user) {
  return new Promise(async (resolve) =>{
    const response = await fetch(" /api/users/"+user.id, {
      method : "PATCH",
      body : JSON.stringify(user),
      headers : {"content-type": "application/json"}
    })
    const data = await response.json()
    resolve({data})
  }
  );
}

export function fetchAllUser() {
  return new Promise(async (resolve) =>{
    const response = await fetch(" /api/users/all")
    const data = await response.json()
    resolve({data})
  }
  );
}


