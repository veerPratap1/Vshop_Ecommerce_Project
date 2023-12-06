import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createBrand,
  createCategory,
  createColour,
  createProducts,
  createReview,
  createSize,
  createSubCategory,
  deleteBrand,
  deleteCategory,
  deleteColour,
  deleteSize,
  deleteSubCategory,
  fetchAllProducts,
  fetchBrand,
  fetchCatagory,
  fetchColour,
  fetchProductById,
  fetchProductsByFilter,
  fetchSize,
  fetchSubCatagory,
  updateBrand,
  updateCategory,
  updateColour,
  updateProduct,
  updateProductImages,
  updateProductThumbnail,
  updateSize,
  updateSubCategory,
} from "./ProductApi";

const initialState = {
  products: [],
  status: "idle",
  totalItems: 0,
  totalCategory: 0,
  totalSubCategory: 0,
  totalBrand: 0,
  catagories: [],
  colour: [],
  size: [],
  Subcatagories: [],
  brands: [],
  reviews: [],
  error: null,
  selectedProduct: null,
};

export const createProductAsync = createAsyncThunk(
  "product/createProducts",
  async (product) => {
    const response = await createProducts(product);
    return response.data;
  }
);
export const createReviewAsync = createAsyncThunk(
  "product/createReview",
  async (review, { rejectWithValue }) => {
    try {
      const response = await createReview(review);
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const createCategoryAsync = createAsyncThunk(
  "product/createCategory",
  async (value) => {
    const response = await createCategory(value);
    return response.data;
  }
);
export const createBrandAsync = createAsyncThunk(
  "product/createBrand",
  async (value) => {
    const response = await createBrand(value);
    return response.data;
  }
);
export const createSubCategoryAsync = createAsyncThunk(
  "product/createSubCategory",
  async (value) => {
    const response = await createSubCategory(value);
    return response.data;
  }
);
export const createColourAsync = createAsyncThunk(
  "product/createColour",
  async (value) => {
    const response = await createColour(value);
    return response.data;
  }
);
export const createSizeAsync = createAsyncThunk(
  "product/createSize",
  async (value) => {
    const response = await createSize(value);
    return response.data;
  }
);
export const fetchProductByFilterAsync = createAsyncThunk(
  "product/fetchProductsByFilter",
  async ({ filter, sort, pagination, admin }) => {
    const response = await fetchProductsByFilter(
      filter,
      sort,
      pagination,
      admin
    );
    return response.data;
  }
);
export const fetchAllProductAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async (title) => {
    const response = await fetchAllProducts(title);
    return response.data;
  }
);
export const deleteCatagoryAsync = createAsyncThunk(
  "product/deleteCategory",
  async (id) => {
    const response = await deleteCategory(id);
    return response.data;
  }
);
export const deleteBrandAsync = createAsyncThunk(
  "product/deleteBrand",
  async (id) => {
    const response = await deleteBrand(id);
    return response.data;
  }
);
export const deleteSubCatagoryAsync = createAsyncThunk(
  "product/deleteSubCategory",
  async (id) => {
    const response = await deleteSubCategory(id);
    return response.data;
  }
);
export const fetchCatagoryAsync = createAsyncThunk(
  "product/fetchCatagory",
  async (value) => {
    const response = await fetchCatagory(value);
    return response.data;
  }
);
export const fetchSubCatagoryAsync = createAsyncThunk(
  "product/fetchSubCatagory",
  async (value) => {
    const response = await fetchSubCatagory(value);
    return response.data;
  }
);
export const updateCategoryAsync = createAsyncThunk(
  "product/updateCategory",
  async (item) => {
    const response = await updateCategory(item);
    return response.data;
  }
);
export const updateBrandAsync = createAsyncThunk(
  "product/updateBrand",
  async (item) => {
    const response = await updateBrand(item);
    return response.data;
  }
);
export const updateSubCategoryAsync = createAsyncThunk(
  "product/updateSubCategory",
  async (item) => {
    const response = await updateSubCategory(item);
    return response.data;
  }
);
export const deleteColourAsync = createAsyncThunk(
  "product/deleteColour",
  async (id) => {
    const response = await deleteColour(id);
    return response.data;
  }
);
export const deleteSizeAsync = createAsyncThunk(
  "product/deleteSize",
  async (id) => {
    const response = await deleteSize(id);
    return response.data;
  }
);
export const fetchColourAsync = createAsyncThunk(
  "product/fetchColour",
  async (value) => {
    const response = await fetchColour(value);
    return response.data;
  }
);
export const fetchSizeAsync = createAsyncThunk(
  "product/fetchSize",
  async (value) => {
    const response = await fetchSize(value);
    return response.data;
  }
);
export const updateColourAsync = createAsyncThunk(
  "product/updateColour",
  async (item) => {
    const response = await updateColour(item);
    return response.data;
  }
);
export const updateSizeAsync = createAsyncThunk(
  "product/updateSize",
  async (item) => {
    const response = await updateSize(item);
    return response.data;
  }
);
export const fetchBrandAsync = createAsyncThunk(
  "product/fetchBrand",
  async (value) => {
    const response = await fetchBrand(value);
    return response.data;
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const response = await updateProduct(product);
    return response.data;
  }
);
export const updateProductThumbnailAsync = createAsyncThunk(
  "product/updateProductThumbnail",
  async ({ formData, id }) => {
    const response = await updateProductThumbnail(formData, id);
    return response.data;
  }
);
export const updateProductImagesAsync = createAsyncThunk(
  "product/updateProductImages",
  async ({ formData, id, index }) => {
    const response = await updateProductImages(formData, id, index);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(createReviewAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createReviewAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct.reviews.push(action.payload.reviews);
        state.selectedProduct.rating = action.payload.rating;
        state.selectedProduct.numReviews = action.payload.numReviews;
      })
      .addCase(createReviewAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(createCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.catagories.push(action.payload);
      })
      .addCase(createBrandAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBrandAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands.push(action.payload);
      })
      .addCase(createSubCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createSubCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.Subcatagories.push(action.payload);
      })
      .addCase(createColourAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createColourAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.colour.push(action.payload);
      })
      .addCase(createSizeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createSizeAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.size.push(action.payload);
      })
      .addCase(fetchProductByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchCatagoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCatagoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.catagories = action.payload.category;
        state.totalCategory = action.payload.totalCategory;
      })
      .addCase(fetchSubCatagoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubCatagoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.Subcatagories = action.payload.subCategory;
        state.totalSubCategory = action.payload.totalSubCategory;
      })
      .addCase(updateCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.catagories.findIndex(
          (cat) => cat.id === action.payload.id
        );
        state.catagories[index] = action.payload;
      })
      .addCase(updateBrandAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBrandAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.brands.findIndex(
          (cat) => cat.id === action.payload.id
        );
        state.brands[index] = action.payload;
      })
      .addCase(updateSubCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSubCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.Subcatagories.findIndex(
          (SubCat) => SubCat.id === action.payload.id
        );
        state.Subcatagories[index] = action.payload;
      })
      .addCase(deleteCatagoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCatagoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.catagories.findIndex(
          (cat) => cat.id === action.payload.id
        );
        state.catagories.splice(index, 1);
      })
      .addCase(deleteBrandAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBrandAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.brands.findIndex(
          (cat) => cat.id === action.payload.id
        );
        state.brands.splice(index, 1);
      })
      .addCase(deleteSubCatagoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSubCatagoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.Subcatagories.findIndex(
          (subCat) => subCat.id === action.payload.id
        );

        state.Subcatagories.splice(index, 1);
      })
      .addCase(fetchColourAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchColourAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.colour = action.payload;
      })
      .addCase(fetchSizeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSizeAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.size = action.payload;
      })
      .addCase(updateColourAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateColourAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.colour.findIndex(
          (cat) => cat.id === action.payload.id
        );
        state.colour[index] = action.payload;
      })
      .addCase(updateSizeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSizeAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.size.findIndex(
          (SubCat) => SubCat.id === action.payload.id
        );
        state.size[index] = action.payload;
      })
      .addCase(deleteColourAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteColourAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.colour.findIndex(
          (cat) => cat.id === action.payload.id
        );
        state.colour.splice(index, 1);
      })
      .addCase(deleteSizeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSizeAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.size.findIndex(
          (subCat) => subCat.id === action.payload.id
        );

        state.size.splice(index, 1);
      })
      .addCase(fetchBrandAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload.brand;
        state.totalBrand = action.payload.totalBrand;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
        state.selectedProduct = action.payload;
      })
      .addCase(updateProductThumbnailAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductThumbnailAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
        state.selectedProduct = action.payload;
      })
      .addCase(updateProductImagesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductImagesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
        state.selectedProduct = action.payload;
      })
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProduct = (state) => state.product.products;

export const selectTotalItems = (state) => state.product.totalItems;
export const selectProductError = (state) => state.product.error;
export const selectTotalCategory = (state) => state.product.totalCategory;
export const selectTotalSubCategory = (state) => state.product.totalSubCategory;
export const selectTotalBrand = (state) => state.product.totalBrand;
export const selectCatagory = (state) => state.product.catagories;
export const selectSubCatagory = (state) => state.product.Subcatagories;
export const selectColour = (state) => state.product.colour;
export const selectSize = (state) => state.product.size;
export const selectBrand = (state) => state.product.brands;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectProductStatus = (state) => state.product.status;

export default productSlice.reducer;
