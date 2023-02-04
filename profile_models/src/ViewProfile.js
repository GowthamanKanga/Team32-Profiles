import React, { Component } from 'react'
import { useCallback } from 'react';
import ViewBooking, {viewBooking} from './ViewBooking';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


import backgroundImage from './pexels-pixabay-220453.jpg'
export default function ViewProfile() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/home");
  }
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
  const [showBooking,setShowBooking] = useState("")
  
const onhandleClose  = () => setShowBooking(false)
console.log(showBooking)
  const userId =  localStorage.getItem("userId");
    
  const fetchData = async () => {
    try {
        const res = await fetch(`http://localhost:3000/user/${userId}`, {
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
 
  return (
  

<div>


<link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"/>
<link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"/>
<img  src="../pexels-pixabay-220453.jpg"/>

<main className="profile-page">

  <section className="relative block h-500-px">
   
  <section className="relative block h-500-px bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')` }}>
</section>

  
  </section>
  <section className="relative py-16 bg-blueGray-200">
    <div className="container mx-auto px-4">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
              <div className="relative">
                <img alt="..." src={backgroundImage}className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-20 -ml-20 lg:-ml-20 max-w-150-px"/>
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
              <div className="py-6 px-3 mt-32 sm:mt-0">
                <button className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                  Connect
                </button>
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4 lg:order-1">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">Booking</span>
                </div>
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Park Visited</span>
                </div>
                
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2 capitalize">
            {first_name +" " + last_name}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              
              <h6> <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
               {address + ", " + city+  ", "}</h6>
              { province+", " +zip_code+ ", " +country}
            </div>
            <div className="mb-2 text-blueGray-600 mt-10 underline uppercase">
              <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400" ></i>{email}
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>University of Computer Science
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                  An artist of considerable range, Jenna the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy writes,
                  performs and records all of his own music, giving it a
                  warm, intimate feel with a solid groove structure. An
                  artist of considerable range.
                </p>
              </div>
              
            </div>
          </div>
         
        </div>
      </div>
    </div>
    


    <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
  
</footer>

  </section>
  <div className="container mx-auto px-4">
  <body>
 
                <div class="bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 px-4 py-5 border-b rounded-t sm:px-6">
                  <h3 class="text-lg leading-6 font-medium text-white">
                   Booking List
                  </h3>
                </div>
                <div class="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul class="divide-y divide-gray-200">
                    <li>
                      <a class="block hover:bg-gray-50">
                        <div class="px-4 py-4 sm:px-6">
                          <div class="flex items-center justify-between">
                            <p class="text-sm font-thin text-gray-700 truncate">
                              Increase sales by 10% year over year
                            </p>
                           
                            <button   onClick={()=>setShowBooking(true)} class="hover:bg-gray-200  bg-gray-100     outline-none focus:outline-none font-semibold py-2 px-4  rounded-full">
  View Details
</button>
   
                          </div>
                          <div class="mt-2 sm:flex sm:justify-between">
                            <div class="sm:flex">
                              <p class="flex items-center text-sm font-light text-gray-500">
                                <time datetime="2020-01-07">January 7, 2020</time>
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                
              <li>
                      <a class="block hover:bg-gray-50">
                        <div class="px-4 py-4 sm:px-6">
                          <div class="flex items-center justify-between">
                            <p class="text-sm font-thin text-gray-700 truncate">
                              Increase newsletter subscribers by 500
                            </p>
                              
                            <button class="hover:bg-gray-200  bg-gray-100   outline-none focus:outline-none font-semibold py-2 px-4  rounded-full">
  View Details
</button>
                          </div>
                          <div class="mt-2 sm:flex sm:justify-between">
                            <div class="sm:flex">
                              <p class="flex items-center text-sm font-light text-gray-500">
                                <time datetime="2020-01-07">January 7, 2020</time>
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                
             <li>
                      <a class="block hover:bg-gray-50">
                        <div class="px-4 py-4 sm:px-6">
                          <div class="flex items-center justify-between">
                            <p class="text-sm font-thin text-gray-700 truncate">
                              Increase customer satisfaction rating by 10 points 
                            </p>
                               
                            <button class="hover:bg-gray-200  bg-gray-100  outline-none focus:outline-none font-semibold py-2 px-4  rounded-full">
  View Details
</button>
                          </div>
                          <div class="mt-2 sm:flex sm:justify-between">
                            <div class="sm:flex">
                              <p class="flex items-center text-sm font-light text-gray-500">
                                <time datetime="2020-01-07">January 7, 2020</time>
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>

                </div>
              </body>
              </div>
              <ViewBooking visible={showBooking} onClose ={onhandleClose}/>



            

</main>

     
       
</div>



  )
}
