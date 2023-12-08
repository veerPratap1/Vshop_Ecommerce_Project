// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(" /api/auth/signUp", {
      method: "POST",
      body: userData,
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function checkUser(loginData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(" /api/auth/login", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
       return  resolve({ data });
      } else {
        const error = await response.text();
       reject(error);
      }
    } catch (error) {
       reject(error);
    }
  });
}
export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(" /api/auth/check");
      if (response.ok) {
        const data = await response.json();
       return  resolve({ data });
      } else {
        const error = await response.text();
       reject(error);
      }
    } catch (error) {
       reject(error);
    }
  });
}
export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(" /api/auth/reset-password-request",{
        method: "POST",
        body: JSON.stringify(email),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
       return  resolve({ data });
      } else {
        const error = await response.text();
       reject(error);
      }
    } catch (error) {
       reject(error);
    }
  });
}
export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(" /api/auth/reset-password",{
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
       return  resolve({ data });
      } else {
        const error = await response.text();
       reject(error);
      }
    } catch (error) {
       reject(error);
    }
  });
}


export function signOutUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(" /api/auth/logout");
      if (response.ok) {
       resolve({data: "success"});
      } else {
        const error = await response.text();
       reject(error);
      }
    } catch (error) {
       reject(error);
    }
  });
}
