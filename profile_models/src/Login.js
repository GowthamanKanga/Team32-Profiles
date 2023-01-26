


import React, { Component } from 'react'

const INITIAL_VALUE ={
   username:"",
   password:""

}
const loginErr ={
   msg : "",
   success:""
}

export class Login extends Component {

   constructor(props){
       super(props)
       this.state={
          ...INITIAL_VALUE,
          ...loginErr
          
          
       }
   }
   onValueChanged =(event)=>{
     
    this.setState({
      [event.target.name]: event.target.value,
      msg: ""
      ,success:""
    });
  };
   onSubmitLogin = async (event) => {
    event.preventDefault();
  
    try {
      const res = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(this.state)
      });
  
      console.log(res)
      if (res.ok) {
        const data = await res.json();
        this.setState({ success: data.message });
        localStorage.setItem("token", "Bearer " + data.accessToken);
      } else {
        localStorage.removeItem("token");
        const error = await res.json();
        this.setState({ msg: error.message });
      }
    } catch (err) {
      console.error(err);
    }
  };
  
   render(){
    return (
     <><section class="bg-gray-50 dark:bg-gray-900">
     <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
         <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
             <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
             Hello    
         </a>
         
         <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
             <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                 <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                     Sign in to your account
                     
                 </h1>
                 <h3>  {this.state.success ? <div className="text-green-600">{this.state.success}</div> : null}</h3>
                 <form class="space-y-4 md:space-y-6" action="#">
                     <div>
                         <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                         <input 
                        value ={this.state.email} 
                        onChange={event=>this.onValueChanged(event)} 
                        name ="username"
                        type="text"  
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com" required=""/>                     </div>
                     <div>
                         <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                         <input 
                        value ={this.state.password} 
                        onChange={event=>this.onValueChanged(event)} 
                        name ="password"
                        type="password"  
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="•••••••" required=""/>
                                         </div>
                     <div class="flex items-center justify-between">
                         <div class="flex items-start">
                             <div class="flex items-center h-5">
                               <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                             </div>
                             <div class="ml-3 text-sm">
                               <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                             </div>
                         </div>
                         <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                     </div>
                     <span className='text-red-600'> { this.state.msg}</span>
                    
                     <button 
                   type="submit" 
                   onClick={this.onSubmitLogin}
                   className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-800">Create an account</button>
                     <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                         Don’t have an account yet? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                     </p>
                 </form>
             </div>
         </div>
     </div>
   </section>
   </>
    )
  }
}

