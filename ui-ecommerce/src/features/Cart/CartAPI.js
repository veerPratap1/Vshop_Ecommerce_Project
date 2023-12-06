// A mock function to mimic making an async request for data
export function addToCartById(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/carts", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchCartItemsById() {
  return new Promise(async (resolve) => {
    const response = await fetch("/carts");
    const data = await response.json();
    resolve({ data });
  });
}
export function updateCart(updateItem) {
  return new Promise(async (resolve) => {
    const response = await fetch("/carts/"+updateItem.id,{
      method: "PATCH",
      body: JSON.stringify(updateItem),
      headers: {"content-type": "application/json"}
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function deleteCartItem(removeItem) {
  return new Promise(async (resolve) => {
    const response = await fetch("/carts/"+removeItem,{
      method: "DELETE"
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function resetCart() {
  return new Promise(async (resolve) =>{
    const response = await fetchCartItemsById()
    const items = response.data
    for(let item of items){
      await deleteCartItem(item.id)
    }
    resolve({status: "success"})
  }
  );
}
