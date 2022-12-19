import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from "axios";
import LoginView from "@/views/LoginView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },

]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path.startsWith('/login')){
    window.localStorage.removeItem('permit')
    next()
  }else{
    let permit=JSON.parse(window.localStorage.getItem('permit'))
    if(!permit){
      next({path:'/login'})
    }else{
      axios({
        url:'http://localhost:8088/service/student/check',
        method:'get',
        headers: {
          token:permit.token
        }
      }).then((resp)=> {
        console.log(resp.data)
        if(!resp.data){
          next({path:'/login'})
        }
      })
      next()
    }
  }
})

export default router
