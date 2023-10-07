import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '@/views/MainView'
import AuthView from '@/views/AuthView'
import Login from '@/pages/Auth/Login'
import AdminDashboard from "@/pages/Dashboard/AdminDashboard"
import AdminList from "../pages/Admin/AdminList"
import SellerList from "../pages/Seller/SellerList"
import BuyerList from "../pages/Buyer/BuyerList"
import Merchandise from "../pages/Merchandise/MerchandiseList"
import AdminAdd from "../pages/Admin/AdminAdd"
import AdminEdit from "../pages/Admin/AdminEdit"
// import store from "../store/index"
// import Auth from "../api/auth"



Vue.use(VueRouter)

const routes = [

  {
    path: "/",
    name: "Admin Auth",
    component: AuthView,
    redirect: "/auth/login",
    children: [
      {
        path: "/auth/login",
        name: "Admin Login",
        component: Login,
        
      },
    ],
  },
  {
    path: '/main',
    name: 'Main',
    component: MainView,
    redirect: '/dashboard',
    children: [
      {
        path: "/dashboard",
        name: "AdminDashboard",
        component: AdminDashboard,
        // beforeEnter: function (to, from, next) {
        //   verifyAdminLogin(next);
        // },
      },
      {
        path : "/admins",
        name : "Admin Lists",
        component :AdminList,
       
      },
      {
        path : "/create-admin",
        name : "Admin Add",
        component : AdminAdd,
     
      },
      {
        path : "/admin/:id",
        name : "Admin Edit",
        component : AdminEdit,
       
      },
      {
        path : "/sellers",
        name : "Seller Lists",
        component : SellerList,
      
      },
      {
        path : "/buyers",
        name : "Buyers Lists",
        component : BuyerList,
       
      },
      {
        path : "/merchandises",
        name : "Merchandise Lists",
        component : Merchandise,
        
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// const verifyAdminLogin = async function (next) {
//   let token;
//   if (store.state.currentUser) {
//     return next();
//   } else {
//     token = localStorage.getItem("token")
//   }

//   if(!token) {
//     next("/auth")
//   } else {
//     let auth = new Auth();
//     try {
//       let response = await auth.isAdmin(token);
//       let user = response.data;
//       user.token = token;
//       store.commit("setCurrentUser", user);
//       return next();
//     } catch (error) {
//       next("/auth/login");
//     }
//   }
// }

export default router
