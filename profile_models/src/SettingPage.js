import React, { Component } from 'react'
import { useCallback } from 'react';

import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'








export default function SettingPage() {


  // reacct state
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setUserEmail] = useState("");
  const [gender, setgender] = useState("");
  
  
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");
  const [province, setprovince] = useState("");
  const [zip_code, setzip_code] = useState("");
  const [response,setResponse] = useState("");
  const [timeOut,setTimeOut] = useState("");
  

  const userId =  localStorage.getItem("userId");
    
  const fetchData = async () => {
    try {
        const res = await fetch(`http://localhost:5000/user/${userId}`, {
            headers: {
                "Authorization": localStorage.getItem("token"),
            },
            method: "GET",
            mode: "cors"
        });
       if(res.status != 200){
        
//setTimeOut("true");

          

           
            {  setTimeout(() => {
              Swal.fire({
                title: "Time out ",
                text: "Login Time Out ! Login Again",
                icon: "error",
                confirmButtonText: "ok",
              });
              navigate("/login")
               ("false") ;
            }, 2000)}

         
          

       }
        const resp = await res.json();
        console.log(resp)
        
        const {first_name, last_name, gender, email, address, city, country, province, zip_code} = resp;
        setfirst_name(first_name);
        setlast_name(last_name);
        setgender(gender);
        setUserEmail(email);
        setaddress(address);
        setcity(city);
        setcountry(country);
        setprovince(province);
        setzip_code(zip_code);

    } catch (err) {
        console.log(err.message);
    }
};

const callback = useCallback(() => fetchData(),[userId]);


useEffect(() => {
    callback();
}, [callback]);
 
const navigate=useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  const userData = {first_name, last_name, gender, email, city, country, province,address,zip_code}

  try {
    const res = await fetch(`http://localhost:5000/user/update/${userId}`, {
      method: "PUT",
      headers: { "content-type": "application/json",
       "Authorization": localStorage.getItem("token") },
      body: JSON.stringify(userData)
    });
   console.log(res)
   if (res.status ==200){
    setResponse("true");
    {  setTimeout(() => {
      setResponse ("false") ;
    }, 1500)}
  
   }
  
   console.log(res.formData)
    // alert('Saved successfully.');
  
  } catch (err) {  
    console.log(err.message); 
  }
} 



  return (
    <>
 




    {response == "true" && (
      <div className="bg-green-100 rounded-md p-3 flex">
    <svg
        className="stroke-2 stroke-current text-green-600 h-8 w-8 mr-2 flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M0 0h24v24H0z" stroke="none" />
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12l2 2 4-4" />
    </svg>
    <div className="text-green-700">
       <div className="font-bold text-xl">Your settings has been saved!</div>
       </div>
       </div>
      )}

       
       

   
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
    <div className="container max-w-screen- mx-auto">
        
      <div>
    
      <form onSubmit={handleSubmit}>

        
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div className="text-gray-600">
            <div class="mx-10 mt-18   w-60 text-center ">
  <div class="relative  w-50 img-responsive">
  <img class="  object-scale-down object-fill rounded-full absolute" src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
  <div class=" group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500">
  </div>
</div>
</div>
            
              
              
            </div>
            
  
            <div className="lg:col-span-2">
            <p className=" p-5 font-medium text-lg">Personal Details</p>
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                
             
              
              
                <div className="md:col-span-3">
                  <label for="first_name">First Name</label>
                  <input 
                  
                  type="text" 
                  name="first_name" id="first_name"
                  required
                  value ={first_name}
                   onChange={e=>setfirst_name(e.target.value)}
                   className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                </div>
                <div className="md:col-span-2">
                <label for="last_name">Last Name</label>
                  <input type="text" 
                  required
                  name="last_name" id="last_name"
                  value ={last_name} onChange={e=>setlast_name(e.target.value)}
                   className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                </div>
             
  
                <div className="md:col-span-5">
                  <label for="email">Email Address</label>
                  <input type="text" name="email" id="email"
                  required
                  value ={email} onChange={e=>setUserEmail(e.target.value)}
                   className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"   />
                </div>
  
                <div className="md:col-span-3">
                  <label for="address">Address / Street</label>
                  <input type="text" name="address" id="address"
                  value ={address} onChange={e=>setaddress(e.target.value)}
                   className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                </div>
  
                <div className="md:col-span-2">
                  <label for="city">City</label>
                  <input type="text" name="city" id="city"
                  value ={city} onChange={e=>setcity(e.target.value)}
                   className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="" />
                </div>
  
                <div className="md:col-span-2">
                  <label for="country">Country / region</label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input name="country" id="country" placeholder="Country"
                     value ={country} onChange={e=>setcountry(e.target.value)}
                     className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                    
                  </div>
                </div>
  
                <div className="md:col-span-2">
                  <label for="state">State / province</label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input name="state" id="state"
                     value ={province} onChange={e=>setprovince(e.target.value)}
                      placeholder="State" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                    
                   
                  </div>
                </div>
  
                <div className="md:col-span-1">
                  <label for="zipcode">Zipcode</label>
                  <input type="text" name="zipcode" id="zipcode" 
                   value ={zip_code} onChange={e=>setzip_code(e.target.value)}
                   className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="M8EHJ5"  />
                </div>
  
                <div className="md:col-span-5">
                  <div className="inline-flex items-center">
                    <input type="checkbox" name="billing_same" id="billing_same" className="form-checkbox" />
                    <label for="billing_same" className="ml-2">My billing address is different than above.</label>
                  </div>
                </div>
  
               
        
                <div className="md:col-span-5 text-right">
                  <div className="inline-flex items-end">
                    <button   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                    
                  </div>
                  
                </div>
  
              </div>
            </div>
          </div>
        </div>
        </form>
      </div>

      
      <div className="mt-10 sm:mt-0">
        {
          "COLS  ARE NUM OF BOX YOU NEED AND SPAN IS NUMBER YOU WANT THAT ITEM TO BE "
        }
    <div className="md:grid md:grid-cols-4 md:gap-6">
      
    <div className="mt-5 md:col-span-2 md:mt-0">
        <form action="#" method="POST">
          
          <div className="overflow-hidden shadow sm:rounded-md">
            
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              
            <div className="md:col-span-3">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
        </div>
      </div>
              <fieldset>
               
                <div className="font-medium text-lg text-gray-900" aria-hidden="true">
                  By Email
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                   
                    <label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span class="ml-3 text-large font-sm text-gray-900 dark:text-gray-800"> Event Notification</span>
</label>
                  </div>
                  <div className="flex items-start">
                       
                  <label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span class="ml-3 text-large font-sm text-gray-900 dark:text-gray-800"> News Letter Notification</span>
</label>
                  </div>
                 
                </div>
              </fieldset>
              <fieldset>
               
               <div className="font-medium text-lg text-gray-900" aria-hidden="true">
                Push Notification
               </div>
               <div className="mt-4 space-y-4">
                 <div className="flex items-start">
                  
                   <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" value="" class="sr-only peer"/>
 <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
 <span class="ml-3 text-large font-sm text-gray-900 dark:text-gray-800"> Event Notification</span>
</label>
                 </div>
                 <div className="flex items-start">
                      
                 <label class="relative inline-flex items-center cursor-pointer">
 <input type="checkbox" value="" class="sr-only peer"/>
 <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
 <span class="ml-3 text-large font-sm text-gray-900 dark:text-gray-800"> News Letter Notification</span>
</label>
                 </div>
                
               </div>
             </fieldset>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>




      <div className="mt-5 md:col-span-2 md:mt-0">
        <form action="#" method="POST">
          
          <div className="overflow-hidden shadow sm:rounded-md">
            
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              
            <div className="md:col-span-4">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Password Information</h3>
          
        </div>
      </div>
              <fieldset>
              <div className="md:grid md:grid-cols-3 md:gap-50">
             
                  <label  for="address" >Current password</label>
                  <div className="md:col-span-3  mr-20 mb-5 ">
                  <input type="text" name="currentPass" id="currentPass"
                  value ={""} onChange={e=>setaddress(e.target.value)}
                   className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="••••••••••••••••" />
                </div>
                <label for="address">New password</label>
                <div className="md:col-span-3  mr-20 mb-5">
                 
                  <input type="password" name="newPass" id="newPass"
                  value ={address} onChange={e=>setaddress(e.target.value)}
                   className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="••••••••••••••••" />
                </div> 
                <label for="confirmNewPass">Confirm Password</label>
                <div className="md:col-span-3  mr-20 mb-5">
                 
                  <input type="password" name="confirmNewPass" id="confirmNewPass"
                  value ={address} onChange={e=>setaddress(e.target.value)}
                   className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="••••••••••••••••" />
                </div>
                
                <h2></h2>
                </div>
                <div className="px-4 sm:px-0">
          <h3 className="text-mid font-medium leading-6 text-gray-900"> Password requirements:</h3>
          <h3 className="text-mid font-medium leading-6 text-gray-400">Ensure that these requirements are met:</h3>
          <h4 className="text-mid font-sm leading-6 text-gray-400">At least 10 characters (and up to 100 characters)</h4>
          <h4 className="text-mid font-sm leading-6 text-gray-400">At least one lowercase character</h4>
          <h4 className="text-mid font-sm leading-6 text-gray-400">Inclusion of at least one special character, e.g., ! @ # ?</h4>
       
          </div>
              </fieldset>

         
            </div>
            
            <div className="bg-gray-50 px-4 py-1 text-right sm:px-6">
              
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
   
    </div>
  </div>
 

 

</>
  )
}

// import React, { Component } from 'react'

// export default class SettingPage extends Component {
//   render() {
//     return (
//       <>
//       <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
//       <div className="container max-w-screen-lg mx-auto">
          
//         <div>
      
    
//           <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
//             <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
//               <div className="text-gray-600">
//                 <p className="font-medium text-lg">Personal Details</p>
                
                
//               </div>
              
    
//               <div className="lg:col-span-2">
//                 <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
//                 <h2 className="font-semibold text-xl text-gray-600">SETTING </h2>
//                   <div className="md:col-span-5">
//                     <label for="full_name">Full Name</label>
//                     <input type="text" name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" />
//                   </div>
    
//                   <div className="md:col-span-5">
//                     <label for="email">Email Address</label>
//                     <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="email@domain.com" />
//                   </div>
    
//                   <div className="md:col-span-3">
//                     <label for="address">Address / Street</label>
//                     <input type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
//                   </div>
    
//                   <div className="md:col-span-2">
//                     <label for="city">City</label>
//                     <input type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
//                   </div>
    
//                   <div className="md:col-span-2">
//                     <label for="country">Country / region</label>
//                     <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
//                       <input name="country" id="country" placeholder="Country" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value="" />
//                       <button tabindex="-1" className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
//                         <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                           <line x1="18" y1="6" x2="6" y2="18"></line>
//                           <line x1="6" y1="6" x2="18" y2="18"></line>
//                         </svg>
//                       </button>
//                       <button tabindex="-1" for="show_more" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
//                         <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
//                       </button>
//                     </div>
//                   </div>
    
//                   <div className="md:col-span-2">
//                     <label for="state">State / province</label>
//                     <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
//                       <input name="state" id="state" placeholder="State" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value="" />
//                       <button tabindex="-1" className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
//                         <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                           <line x1="18" y1="6" x2="6" y2="18"></line>
//                           <line x1="6" y1="6" x2="18" y2="18"></line>
//                         </svg>
//                       </button>
//                       <button tabindex="-1" for="show_more" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
//                         <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
//                       </button>
//                     </div>
//                   </div>
    
//                   <div className="md:col-span-1">
//                     <label for="zipcode">Zipcode</label>
//                     <input type="text" name="zipcode" id="zipcode" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value="" />
//                   </div>
    
//                   <div className="md:col-span-5">
//                     <div className="inline-flex items-center">
//                       <input type="checkbox" name="billing_same" id="billing_same" className="form-checkbox" />
//                       <label for="billing_same" className="ml-2">My billing address is different than above.</label>
//                     </div>
//                   </div>
    
                 
          
//                   <div className="md:col-span-5 text-right">
//                     <div className="inline-flex items-end">
//                       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                      
//                     </div>
                    
//                   </div>
    
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mt-10 sm:mt-0">
//       <div className="md:grid md:grid-cols-3 md:gap-6">
        
//       <div className="mt-5 md:col-span-4 md:mt-0">
//           <form action="#" method="POST">
            
//             <div className="overflow-hidden shadow sm:rounded-md">
              
//               <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                
//               <div className="md:col-span-3">
//           <div className="px-4 sm:px-0">
//             <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
//           </div>
//         </div>
//                 <fieldset>
//                   <legend className="sr-only ">By Email</legend>
//                   <div className="text-base font-medium text-gray-900" aria-hidden="true">
//                     By Email
//                   </div>
//                   <div className="mt-4 space-y-4">
//                     <div className="flex items-start">
//                       <div className="flex h-5 items-center">
//                         <input
//                           id="comments"
//                           name="comments"
//                           type="checkbox"
//                           className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                         />
//                       </div>
//                       <div className="ml-3 text-sm">
//                         <label htmlFor="comments" className="font-medium text-gray-700">
//                           Comments
//                         </label>
//                         <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
//                       </div>
//                     </div>
//                     <div className="flex items-start">
//                       <div className="flex h-5 items-center">
//                         <input
//                           id="candidates"
//                           name="candidates"
//                           type="checkbox"
//                           className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                         />
//                       </div>
//                       <div className="ml-3 text-sm">
//                         <label htmlFor="candidates" className="font-medium text-gray-700">
//                           Candidates
//                         </label>
//                         <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
//                       </div>
//                     </div>
//                     <div className="flex items-start">
//                       <div className="flex h-5 items-center">
//                         <input
//                           id="offers"
//                           name="offers"
//                           type="checkbox"
//                           className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                         />
//                       </div>
//                       <div className="ml-3 text-sm">
//                         <label htmlFor="offers" className="font-medium text-gray-700">
//                           Offers
//                         </label>
//                         <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
//                       </div>
//                     </div>
//                   </div>
//                 </fieldset>
//                 <fieldset>
//                   <legend className="contents text-base font-medium text-gray-900">Push Notifications</legend>
//                   <p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
//                   <div className="mt-4 space-y-4">
//                     <div className="flex items-center">
//                       <input
//                         id="push-everything"
//                         name="push-notifications"
//                         type="radio"
//                         className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                       />
//                       <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
//                         Everything
//                       </label>
//                     </div>
//                     <div className="flex items-center">
//                       <input
//                         id="push-email"
//                         name="push-notifications"
//                         type="radio"
//                         className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                       />
//                       <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
//                         Same as email
//                       </label>
//                     </div>
//                     <div className="flex items-center">
//                       <input
//                         id="push-nothing"
//                         name="push-notifications"
//                         type="radio"
//                         className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                       />
//                       <label htmlFor="push-nothing" className="ml-3 block text-sm font-medium text-gray-700">
//                         No push notifications
//                       </label>
//                     </div>
//                   </div>
//                 </fieldset>
//               </div>
//               <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
//                 <button
//                   type="submit"
//                   className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
     
//       </div>
//     </div>
   

   
  
//   </>
//     )
//   }
// }


  
      


   
     