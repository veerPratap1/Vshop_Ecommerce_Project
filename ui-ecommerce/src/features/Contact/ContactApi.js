export function createMessage(message) {
  return new Promise(async (resolve) => {
    const response = await fetch("/message", {
      method: "POST",
      body: JSON.stringify(message),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllMessage() {
  return new Promise(async (resolve) => {
    const response = await fetch("/message");
    const data = await response.json();
    resolve({ data });
  });
}
