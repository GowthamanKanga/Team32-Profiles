
import React, { Component } from 'react'

const INITIAL_STATE ={
   
    first_name:"",
    last_name:"",
    email:"",
   password:"",
}
const confirmPass = ""
const ERROR_STATE ={
    first_name:"",
    last_name:"",
    email:"",
   password:"",
   passErr :""
  
  }
const SignupStatus = ""


export  default class Signup extends Component {

   constructor(props){
       super(props)
       this.state={
          ...INITIAL_STATE,
          SignupStatus,
          confirmPass,
          ERROR_STATE
       }
   }
   onValueChanged =(event)=>{
     
    this.setState({
        [event.target.name]: event.target.value,
        ERROR_STATE : {
            first_name:"",
            last_name:"",
            email:"",
           password:"",
           passErr :""
          
          }
      });
     if (event.target.name === 'confirmPass' && this.state.password !== event.target.value) {
        this.setState({ passErr: 'Passwords do not match' });
      } else {
        this.setState({ passErr: '' });
      }
    }

    onSubmitSignup = (event) => {
        event.preventDefault();
      
        fetch("http://localhost:5000/user/signup", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(this.state),
        })
          .then((res) => {
            if (res.status === 201) {
              this.setState({ SignupStatus: "success" });
              setTimeout(() => {
                window.location.replace('/login')
              }, 1500);
            } else {
              return res.json();
            }
          })
          .then((resp) => {
            console.log(resp)
            
              this.setState({ ERROR_STATE: resp.errors });
            
          })
          .catch((err) => {
            console.error(err.message);
          });
      };


render(){
    return (
     <>
      <section className=" bg-gray-50 dark:bg-gray-500 md:h-800">
   <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 ">
      
       <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:bg-gray-800 dark:border-gray-700 ">
           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
           {this.state.SignupStatus === "success" && (
        <div className="text-blue-600">
          You have registered successfully! Redirecting to login page...
          </div>
      )}
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                   Sign up 
               </h1>
               <form className="space-y-4 md:space-y-6" action="#">
               <div>  
                       <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Email</label>

                       <input 
                        value ={this.state.email} 
                        onChange={event=>this.onValueChanged(event)} 
                        name ="email"
                        type="text"  
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com" required=""/>
        <h3>  {this.state.ERROR_STATE.email ? <div className="text-red-600">{this.state.ERROR_STATE.email}</div> : null}</h3>

                       
                   </div>
                   <div>
                       <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>

                       <input 
                        value ={this.state.first_name} 
                        onChange={event=>this.onValueChanged(event)} 
                        name ="first_name"
                        type="text"  
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="ABCD" required=""/>
                        <h3>  {this.state.ERROR_STATE.first_name ? <div className="text-red-600">{this.state.ERROR_STATE.first_name}</div> : null}</h3>
                       
                   </div>
                   
                   <div>
                       <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>

                       <input 
                        value ={this.state.last_name} 
                        onChange={event=>this.onValueChanged(event)} 
                        name ="last_name"
                        type="text"  
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="XYZ" required=""/>
                            <h3>  {this.state.ERROR_STATE.last_name ? <div className="text-red-600">{this.state.ERROR_STATE.last_name}</div> : null}</h3>
                       
                   </div>
                   <div>
                       <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password </label>

                       <input 
                        value ={this.state.password} 
                        onChange={event=>this.onValueChanged(event)} 
                        name ="password"
                        type="password"  
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="•••••••" required=""/>
                           <h3>  {this.state.ERROR_STATE.password ? <div className="text-red-600">{this.state.ERROR_STATE.password}</div> : null}</h3>
                       
                   </div>
                   <div>
                       <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password </label>

                       <input 
                        value ={this.state.confirmPass} 
                        onChange={event=>this.onValueChanged(event)} 
                        name ="confirmPass"
                        type="password"  
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="•••••••" required=""/>
                           <h3>  {this.state.ERROR_STATE.passErr ? <div className="text-red-600">{this.state.ERROR_STATE.passErr}</div> : null}</h3>
                       
                   </div>
                   
                   <div className="flex items-start">
                       <div className="flex items-center h-5">
                         <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                       </div>
                       <div className="ml-3 text-sm">
                         <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                       </div>
                   </div>
                   <button 
                   type="submit" 
                   onClick={this.onSubmitSignup}
                   className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-800">Create an account</button>


                   <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                       Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
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

