import React from 'react'

const LoginHeader= ()=> {

    const divStyle = {
        backgroundImage: 'url("assets/media/misc/menu-header-bg.jpg")',
    };

    return (
       
                <div id="kt_app_header" class="app-header">
                    {/*begin::Header primary  */}
                    <div class="app-header-primary" data-kt-sticky="true" data-kt-sticky-name="app-header-primary-sticky" data-kt-sticky-offset="{default: 'false', lg: '300px'}">
                        {/*begin::Header primary container  */}
                        <div class="app-container  container-xxl d-flex  align-items-stretch justify-content-between">
                            {/*begin::Logo and search  */}
                            <div class="d-flex flex-grow-1 flex-lg-grow-0">
                                {/*begin::Logo wrapper  */}
                                <div class="d-flex align-items-center me-7" id="kt_app_header_logo_wrapper">
                                   
                                    <a href="/dashboard" class="d-flex align-items-center me-lg-20 me-5">
                                    <img alt="Logo" src="assets/media/logos/Astronics.png" class="h-20px d-sm-none d-inline" />
                                        <img alt="Logo" src="assets/media/logos/Astronics.png" class="h-20px h-lg-40px theme-light-show d-none d-sm-inline" />
                                        <img alt="Logo" src="assets/media/logos/Astronics.png" class="h-20px h-lg-25px theme-dark-show d-none d-sm-inline" />
                                        {/* <img alt="Logo" src="assets/media/logos/Aex-logo.svg" class="h-20px d-sm-none d-inline" />
                                        <img alt="Logo" src="assets/media/logos/Aex-logo.svg" class="h-20px h-lg-40px theme-light-show d-none d-sm-inline" />
                                        <img alt="Logo" src="assets/media/logos/Aex-logo.png" class="h-20px h-lg-25px theme-dark-show d-none d-sm-inline" /> */}
                                    </a>
                                   
                                </div>
                                {/*end::Logo wrapper  */}
                                {/*begin::Menu wrapper  */}
                               
                                {/*end::Menu wrapper  */}
                            </div>
                            {/*end::Logo and search  */}
                            {/*begin::Navbar  */}
                           
                            {/*end::Navbar  */}
                        </div>
                        {/*end::Header primary container  */}
                    </div>
                    {/*end::Header primary  */}

                </div>
               
    )
}

export default LoginHeader;