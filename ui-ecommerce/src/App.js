import React, { useEffect } from "react";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import CartPage from "./Pages/CartPage";
import CheckOutPage from "./Pages/CheckOutPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import Protected from "./features/Auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItemsByIdAsync } from "./features/Cart/CartSlice";
import {
  checkAuthAsync,
  selectLoginUser,
  selectUserChecked,
} from "./features/Auth/AuthSlice";
import Page404 from "./Pages/Page404";
import OrderSuccess from "./Pages/OrderSuccess";
import UserOrderPage from "./Pages/UserOrderPage";
import UserProfilePage from "./Pages/UserProfilePage";
import { fetchLogedInUserAsync } from "./features/user/UserSlice";
import LogOut from "./features/Auth/components/LogOut";
import ForgetPasswordPage from "./Pages/ForgetPasswordPage";
import AdminProductListPage from "./Pages/AdminProductListPage";
import ProtectedAdmin from "./features/Auth/components/ProtectedAdmin";
import AdminOrdersPage from "./Pages/AdminOrdersPage";
import { transitions, positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import StripCheckout from "./Pages/StripCheckout";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import AddCategoryPage from "./Pages/AddCategoryPage";
import AddSubCategoryPage from "./Pages/AddSubCategoryPage";
import SubCategoryListPage from "./Pages/SubCategoryListPage";
import CategoryListPage from "./Pages/CategoryListPage";
import AddSizePage from "./Pages/AddSizePage";
import AddColourPage from "./Pages/AddColourPage";
import ColourListPage from "./Pages/ColourListPage";
import SizeListPage from "./Pages/SizeListPage";
import AddProductPage from "./Pages/AddProductPage";
import AddBrandPage from "./Pages/AddBrandPage";
import BrandListPage from "./Pages/BrandListPage";
import RecycleBinPage from "./Pages/RecycleBinPage";
import AdminProfilePage from "./Pages/AdminProfilePage";
import ProductShopPage from "./Pages/ProductShopPage";
import AllCategoryPage from "./Pages/AllCategoryPage";
import AllSubCategoryPage from "./Pages/AllSubCategoryPage";
import AllBrandPage from "./Pages/AllBrandPage";
import ProductListByIdPage from "./Pages/ProductListByIdPage";
import AdminDashboardPage from "./Pages/AdminDashboardPage";
import ContactPage from "./Pages/ContactPage";
import AdminPrductViewPage from "./Pages/AdminPrductViewPage";
import OrderDetailInvoicePage from "./Pages/OrderDetailInvoicePage";

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <Home />
    ),
  },
  {
    path: "/allCategory",
    element: (
        <AllCategoryPage />
    ),
  },
  {
    path: "/allSubCategory",
    element: (
        <AllSubCategoryPage />
    ),
  },
  {
    path: "/allBrand",
    element: (
        <AllBrandPage />
    ),
  },
  {
    path: "/shop",
    element: (
        <ProductShopPage />
    ),
  },
  {
    path: "/category/:category",
    element: (
        <ProductListByIdPage />
    ),
  },
  {
    path: "/subCategory/:subCategory",
    element: (
        <ProductListByIdPage />
    ),
  },
  {
    path: "/brand/:brand",
    element: (
        <ProductListByIdPage />
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/logout",
    element: <LogOut />,
  },
  {
    path: "/forget-password",
    element: <ForgetPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "/signUp",
    element: <SignUpPage />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckOutPage />
      </Protected>
    ),
  },
  {
    path: "/shop/product-detail/:id",
    element: (
        <ProductDetailPage />
    ),
  },
  {
    path: "*",
    element: <Page404></Page404>,
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSuccess></OrderSuccess>
      </Protected>
    ),
  },
  {
    path: "/MyOrders",
    element: (
      <Protected>
        <UserOrderPage></UserOrderPage>
      </Protected>
    ),
  },
  {
    path: "/myProfile",
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>
      </Protected>
    ),
  },
  {
    path: "/contact",
    element: (
      <Protected>
        <ContactPage></ContactPage>
      </Protected>
    ),
  },
  {
    path: "/strip-checkout",
    element: (
      <Protected>
        <StripCheckout />
      </Protected>
    ),
  },
  {
    path: "/admin/orderList",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/AdminDashboard",
    element: (
      <ProtectedAdmin>
        <AdminDashboardPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/addCategory",
    element: (
      <ProtectedAdmin>
        <AddCategoryPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/addBrand",
    element: (
      <ProtectedAdmin>
        <AddBrandPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/addColour",
    element: (
      <ProtectedAdmin>
        <AddColourPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/addSize",
    element: (
      <ProtectedAdmin>
        <AddSizePage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/addSubCategory",
    element: (
      <ProtectedAdmin>
        <AddSubCategoryPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/CategoryList",
    element: (
      <ProtectedAdmin>
        <CategoryListPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/CategoryList/:id",
    element: (
      <ProtectedAdmin>
        <CategoryListPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/brandList",
    element: (
      <ProtectedAdmin>
        <BrandListPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/brandList/:id",
    element: (
      <ProtectedAdmin>
        <BrandListPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/coloursList",
    element: (
      <ProtectedAdmin>
        <ColourListPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/coloursList/:id",
    element: (
      <ProtectedAdmin>
        <ColourListPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/sizeList",
    element: (
      <ProtectedAdmin>
        <SizeListPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/sizeList/:id",
    element: (
      <ProtectedAdmin>
        <SizeListPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/SubCategoryList",
    element: (
      <ProtectedAdmin>
        <SubCategoryListPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/productList",
    element: (
      <ProtectedAdmin>
        <AdminProductListPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/recycleBin",
    element: (
      <ProtectedAdmin>
        <RecycleBinPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/updateProduct/:id",
    element: (
      <ProtectedAdmin>
        <AdminPrductViewPage/>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/SubCategoryList/:id",
    element: (
      <ProtectedAdmin>
        <SubCategoryListPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/addProduct",
    element: (
      <ProtectedAdmin>
        <AddProductPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/profile",
    element: (
      <ProtectedAdmin>
        <AdminProfilePage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orderDetail/:id",
    element: (
      <ProtectedAdmin>
        <OrderDetailInvoicePage/>
      </ProtectedAdmin>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoginUser);

  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItemsByIdAsync());
      dispatch(fetchLogedInUserAsync());
    }
  }, [dispatch, user]);
  return (
    <div className="App">
      {userChecked && (
        <Provider template={AlertTemplate} {...options}>
          <RouterProvider router={router} />
        </Provider>
      )}
    </div>
  );
}

export default App;
