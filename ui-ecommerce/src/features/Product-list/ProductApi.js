// A mock function to mimic making an async request for data
export function createProducts(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("/Products", {
      method: "POST",
      body: product,
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function createReview(review) {
  return new Promise(async (resolve, rejected) => {
    try {
      const response = await fetch(`/Products/${review.id}/reviews`, {
        method: "POST",
        body: JSON.stringify(review),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({
          data: {
            rating: data.rating,
            reviews: data.reviews,
            numReviews: data.numReviews,
          },
        });
      } else {
        const error = await response.text();
        rejected(error);
      }
    } catch (error) {
      rejected(error);
    }
  });
}
export function createCategory(values) {
  return new Promise(async (resolve) => {
    const response = await fetch("/categories", {
      method: "POST",
      body: values,
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function createBrand(values) {
  return new Promise(async (resolve) => {
    const response = await fetch("/brands", {
      method: "POST",
      body: values,
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function createSubCategory(values) {
  return new Promise(async (resolve) => {
    const response = await fetch("/Subcategories", {
      method: "POST",
      body: values,
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function createColour(values) {
  return new Promise(async (resolve) => {
    const response = await fetch("/colour", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function createSize(values) {
  return new Promise(async (resolve) => {
    const response = await fetch("/size", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function updateProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("/Products/" + product.id, {
      method: "PATCH",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProductThumbnail(formData, id) {
  return new Promise(async (resolve) => {
    const response = await fetch("/Products/thumbnail/" + id, {
      method: "PATCH",
      body: formData,
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function updateProductImages(formData, id, index) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/Products/${id}/image/${index}`, {
      method: "PATCH",
      body: formData,
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilter(filter, sort, pagination, admin) {
  let queryString = "";

  for (let key in filter) {
    // to get value for key filter[key]
    // pagination = {_page:1, limit:10}
    const catagoryValues = filter[key];
    if (catagoryValues.length) {
      queryString += `${key}=${catagoryValues}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  if (admin) {
    queryString = `admin=true`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch("/products?" + queryString);
    const data = await response.json();

    const totalItem = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItem } });
  });
}
export function fetchAllProducts(title) {
  let queryString = "";

  for (let key in title) {
    queryString += `${key}=${title[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch("/products?" + queryString);
    const data = await response.json();
    const totalItems = response.headers.get("X-Total-Count");

    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}
export function fetchCatagory(value) {
  let queryString = "";

  for (let key in value) {
    queryString += `${key}=${value[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch("/categories?" + queryString);
    const data = await response.json();

    const totalCategory = response.headers.get("X-Total-Count");

    resolve({ data: { category: data, totalCategory: +totalCategory } });
  });
}
export function fetchSubCatagory(value) {
  let queryString = "";

  for (let key in value) {
    queryString += `${key}=${value[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch("/Subcategories?" + queryString);
    const data = await response.json();
    const totalSubCat = response.headers.get("X-Total-Count");

    resolve({ data: { subCategory: data, totalSubCategory: +totalSubCat } });
  });
}
export function updateBrand(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/brands/" + item.id, {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function updateCategory(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/categories/" + item.id, {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateSubCategory(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/Subcategories/" + item.id, {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteCategory(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("/categories/" + id, {
      method: "DELETE",
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function deleteBrand(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("/brands/" + id, {
      method: "DELETE",
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteSubCategory(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("/Subcategories/" + id, {
      method: "DELETE",
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchColour(value) {
  let queryString = "";

  for (let key in value) {
    queryString += `${key}=${value[key]}`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch("/colour?" + queryString);
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchSize(value) {
  let queryString = "";

  for (let key in value) {
    queryString += `${key}=${value[key]}`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch("/size?" + queryString);
    const data = await response.json();
    resolve({ data });
  });
}
export function updateColour(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/colour/" + item.id, {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateSize(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/size/" + item.id, {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteColour(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("/colour/" + id, {
      method: "DELETE",
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteSize(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("/size/" + id, {
      method: "DELETE",
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrand(value) {
  let queryString = "";

  for (let key in value) {
    queryString += `${key}=${value[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch("/brands?" + queryString);
    const data = await response.json();
    const totalBrand = response.headers.get("X-Total-Count");

    resolve({ data: { brand: data, totalBrand: +totalBrand } });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("/Products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}
