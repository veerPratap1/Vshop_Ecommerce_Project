// import { deleteCartItem, fetchCartItemsById } from "../Cart/CartAPI";


// A mock function to mimic making an async request for data
export function createOrder(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function createPdf(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/invoicePdf", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.blob();

    resolve({data})
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders/" + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(sort, pagination) {
  let queryString = "";

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch("/orders?" + queryString);
    const data = await response.json();

    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}
export function fetchOrderById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders/" + id);
    const data = await response.json();

    resolve({ data });
  });
}
