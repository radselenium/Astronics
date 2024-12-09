import React, { useState, useRef, useEffect } from 'react'

import { useMediaQuery } from "@mui/material";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../UserContext'; 
const LogoutUser = () => {

 

    sessionStorage.removeItem('jwtToken'); // Clear the JWT token from session storage
  
    // You may also want to perform any additional cleanup or redirect logic here
  
    window.location.href = '/'; // Redirect to the login page
  
};
export {LogoutUser};


const Header = ({ activeMenuItem }) => {

    const username = sessionStorage.getItem('userName');
    console.log(username)
    const divStyle = {
        backgroundImage: 'url("assets/media/misc/menu-header-bg.jpg")',
    };

    const { instance } = useMsal(); // Access MSAL instance
    const navigate = useNavigate(); // Use useNavigate for redirection
    const handleLogout = (event) => {
        event.preventDefault(); // Prevent default behavior
        instance.logoutRedirect({
          postLogoutRedirectUri: "/", // Redirect to home page after logout
        }).catch(e => {
          console.error("Logout failed:", e);
        });
      };

     const { user } = useUser(); // Get user from context


     const [isClick, setIsClicked] = useState(false);
     const menuRef = useRef(null);
     const isBtnVisible = useMediaQuery("(max-width: 991px)");
     console.log(isBtnVisible);
   
     const handleClickOutside = (event) => {
       if (menuRef.current && !menuRef.current.contains(event.target)) {
         setIsClicked(false);
       }
     };
   
     const handleClick = () => {
       setIsClicked((prev) => !prev);
       console.log(isClick);
     };

     const isMobile = useMediaQuery("(max-width: 760px)");
    
   
     useEffect(() => {
       if (isClick) {
         document.addEventListener("mousedown", handleClickOutside);
       } else {
         document.removeEventListener("mousedown", handleClickOutside);
       }
   
       // Cleanup event listener on component unmount
       return () => {
         document.removeEventListener("mousedown", handleClickOutside);
       };
     }, [isClick]);

    return (

        <div id="kt_app_header" class="app-header">
            {/*begin::Header primary  */}
            <div class="app-header-primary" data-kt-sticky="true" data-kt-sticky-name="app-header-primary-sticky" data-kt-sticky-offset="{default: 'false', lg: '300px'}" >
                {/*begin::Header primary container  */}
                <div class="app-container  container-xxl d-flex  align-items-stretch justify-content-between">
                    {/*begin::Logo and search  */}
                    <div class="d-flex flex-grow-1 flex-lg-grow-0">
                        {/*begin::Logo wrapper  */}
                        <div class="d-flex align-items-center me-7" id="kt_app_header_logo_wrapper">
                            {/*begin::Header toggle  */}
                            <button class="d-lg-none btn btn-icon btn-flex btn-color-gray-600 btn-active-color-primary w-35px h-35px ms-n2 me-2"
                   id="kt_app_header_menu_toggle"  onClick={() => handleClick()}>
                                <i class="ki-outline ki-abstract-14 fs-2"></i>
                            </button>
                            {/*end::Header toggle  */}
                            {/*begin::Logo  */}
                            <a href="/dashboard" class="d-flex align-items-center me-lg-20 me-5">
                                {/* <img alt="Logo" src="assets/media/logos/Aex-logo.svg" class="h-20px d-sm-none d-inline" />
                                <img alt="Logo" src="assets/media/logos/Aex-logo.svg" class="h-20px h-lg-40px theme-light-show d-none d-sm-inline" />
                                <img alt="Logo" src="assets/media/logos/Aex-logo.png" class="h-20px h-lg-25px theme-dark-show d-none d-sm-inline" /> */}
                                <img alt="Logo" src="assets/media/logos/Astronics.png" class="h-20px d-sm-none d-inline" />
                                        <img alt="Logo" src="assets/media/logos/Astronics.png" class="h-20px h-lg-20px theme-light-show d-none d-sm-inline" />
                                        <img alt="Logo" src="assets/media/logos/Astronics.png" class="h-20px h-lg-20px theme-dark-show d-none d-sm-inline" />
                            </a>
                            {/*end::Logo  */}
                        </div>
                        {/*end::Logo wrapper  */}
                        {/*begin::Menu wrapper  */}
                        <div class={`app-header-menu app-header-mobile-drawer align-items-stretch ${
                isBtnVisible ? "drawer drawer-start" : ""
              } ${isClick ? "drawer-on" : ""}`}
              ref={menuRef}
              data-kt-drawer="true" data-kt-drawer-name="app-header-menu" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="250px" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_app_header_menu_toggle" data-kt-swapper="true" data-kt-swapper-mode="{default: 'append', lg: 'prepend'}" data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}">
                            {/*begin::Menu  */}
                            <div class="menu menu-rounded menu-active-bg menu-state-primary menu-column menu-lg-row menu-title-gray-700 menu-icon-gray-500 menu-arrow-gray-500 menu-bullet-gray-500 my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0" id="kt_app_header_menu" data-kt-menu="true">
                                {/*begin:Menu item  */}
                                <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="bottom-start" class={activeMenuItem === 'dashboard' ? 'menu-item here show menu-here-bg menu-lg-down-accordion me-0 me-lg-2' : 'menu-item  menu-lg-down-accordion me-0 me-lg-2'}>
                                    {/*begin:Menu link  */}
                                    <span class="menu-link  py-3" id="custom-menu-item">
                                        <span class="menu-title fs-3"><a style={{ color: "#116bae" }} href='/dashboard'>Dashboard</a>

                                        </span>
                                        <span class="menu-arrow d-lg-none"></span>
                                    </span>
                                    {/*end:Menu link  */}

                                </div>
                                {/*end:Menu item  */}
                                {/*begin:Menu item  */}
                                <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="bottom-start" data-kt-menu-offset="-200,0" class={activeMenuItem === 'messageTracing' ? 'menu-item here show menu-here-bg menu-lg-down-accordion me-0 me-lg-2' : 'menu-item  menu-lg-down-accordion me-0 me-lg-2'}>
                                    {/*begin:Menu link  */}
                                    <span class="menu-link py-3" id="custom-menu-item">
                                        <span class="menu-title fs-3"><a style={{ color: "#116bae" }} href='/messagetracing'>Message Tracing</a></span>
                                        <span class="menu-arrow d-lg-none"></span>
                                    </span>
                                    {/*end:Menu link  */}

                                </div>
                                {/*end:Menu item  */}

                            </div>
                            {/*end::Menu  */}
                        </div>
                        {/*end::Menu wrapper  */}


                    </div>
                    {/*end::Logo and search  */}

                    {/*begin::Navbar  */}
                    <div class="app-navbar flex-shrink-0">

                        {/*begin::User menu  */}
                        <div class="app-navbar-item ms-3 ms-lg-9" id="kt_header_user_menu_toggle">
                            {/*begin::Menu wrapper  */}
                            <div class="d-flex align-items-center" data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
                                {/*begin:Info  */}
                                <div class="text-end   align-items-center justify-content-center me-3">

                                  
                                    <button  className="btn  btn-sm  p-ml-auto d-flex align-items-center" type='button'>

                                    <a href="#" class="text-gray-800  fs-4 fw-bold d-flex align-items-center"><span className='fs-3 pe-2 mobileText' >
                                    {user && user.displayName? isMobile ? user.displayName
                                .split(" ")[0]
                                .concat(
                                  " ",
                                  user.displayName.split(" ")[1][0],
                                  " ",
                                  user.displayName.split(" ")[2]
                                    ? user.displayName.split(" ")[2][0]
                                    : ""
                                )
                            : user.displayName
                          : " "}</span> <i onClick={handleLogout} class=" text-hover-primary fa fa-sign-out fs-2"></i> </a>

                                    </button>
                                    {/* <ul className="dropdown-menu py-0 border-lignt border" style={{ zIndex: "1000" }}>
                                        <li onClick={LogoutUser} style={{cursor:"pointer"}}>
                                            <a className="dropdown-item px-5" > 
                                                <i class=" fa fa-sign-out pe-1"  >
                                                </i> Logout
                                            </a>

                                        </li>

                                    </ul> */}

                                </div>

                               
                                {/*end::User  */}
                            </div>

                           


                            {/*end::Menu wrapper  */}
                        </div>
                        {/*end::User menu  */}
                        {/*begin::Header menu toggle  */}
                        <div class="app-navbar-item d-lg-none ms-2 me-n3 iconhide" title="Show header menu">
                            <div class="btn btn-icon btn-color-gray-500 btn-active-color-primary w-35px h-35px" 
                   id="kt_app_header_menu_toggle" onClick={() => handleClick()}>
                                <i class="ki-outline ki-text-align-left fs-1"></i>
                            </div>
                        </div>
                        {/*end::Header menu toggle  */}
                    </div>
                    {/*end::Navbar  */}


                </div>
                {/*end::Header primary container  */}
            </div>
            {/*end::Header primary  */}

        </div>

    )
}

export default Header