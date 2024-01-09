import { NextResponse } from "next/server"
// import Cookies from "js-cookie"
import Cookies from 'cookies';


export const middleware = (request) =>{
    // const isAuth = localStorage.getItem('isAuth')
    // const cookies = new Cookies(req.headers.cookie); 
    // const isAuth = cookies.get('isAuth');
    // // console.log(Cookies.get('isAuth'));

    let cookie = request.cookies.get('isAuth')
    
    if (!cookie?.value || cookie == undefined) {   
        const url = request.nextUrl.clone()
        url.pathname = '/auth/login'
        return NextResponse.redirect(url)
    }
    
}
export const config = {
    matcher:["/","/favorites"]
}


  