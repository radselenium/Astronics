import React from 'react'

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
                            <button class="d-lg-none btn btn-icon btn-flex btn-color-gray-600 btn-active-color-primary w-35px h-35px ms-n2 me-2" id="kt_app_header_menu_toggle">
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
                        <div class="app-header-menu app-header-mobile-drawer align-items-stretch" data-kt-drawer="true" data-kt-drawer-name="app-header-menu" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="250px" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_app_header_menu_toggle" data-kt-swapper="true" data-kt-swapper-mode="{default: 'append', lg: 'prepend'}" data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}">
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

                                    <a href="#" class="text-gray-800  fs-4 fw-bold d-flex align-items-center"><span className='fs-3 pe-2'>{username}</span> <i onClick={LogoutUser} class=" text-hover-primary fa fa-sign-out fs-2"></i> </a>

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

                            {/*begin::User account menu  */}
                            <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px" data-kt-menu="true">
                                {/*begin::Menu item  */}
                                <div class="menu-item px-3">
                                    <div class="menu-content d-flex align-items-center px-3">
                                        {/*begin::Avatar  */}
                                        <div class="symbol symbol-50px me-5">
                                            <img alt="Logo" src="assets/media/avatars/300-2.jpg" />
                                        </div>
                                        {/*end::Avatar  */}
                                        {/*begin::Username  */}
                                        <div class="d-flex flex-column">
                                            <div class="fw-bold d-flex align-items-center fs-5">Jane Cooper
                                                <span class="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">Pro</span></div>
                                            <a href="#" class="fw-semibold text-muted text-hover-primary fs-7">jane@kt.com</a>
                                        </div>
                                        {/*end::Username  */}
                                    </div>
                                </div>
                                {/*end::Menu item  */}
                                {/*begin::Menu separator  */}
                                <div class="separator my-2"></div>
                                {/*end::Menu separator  */}
                                {/*begin::Menu item  */}
                                <div class="menu-item px-5">
                                    <a href="../../demo35/dist/account/overview.html" class="menu-link px-5">My Profile</a>
                                </div>
                                {/*end::Menu item  */}
                                {/*begin::Menu item  */}
                                <div class="menu-item px-5">
                                    <a href="../../demo35/dist/apps/projects/list.html" class="menu-link px-5">
                                        <span class="menu-text">My Projects</span>
                                        <span class="menu-badge">
                                            <span class="badge badge-light-danger badge-circle fw-bold fs-7">3</span>
                                        </span>
                                    </a>
                                </div>
                                {/*end::Menu item  */}
                                {/*begin::Menu item  */}
                                <div class="menu-item px-5" data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="left-start" data-kt-menu-offset="-15px, 0">
                                    <a href="#" class="menu-link px-5">
                                        <span class="menu-title">My Subscription</span>
                                        <span class="menu-arrow"></span>
                                    </a>
                                    {/*begin::Menu sub  */}
                                    <div class="menu-sub menu-sub-dropdown w-175px py-4">
                                        {/*begin::Menu item  */}
                                        <div class="menu-item px-3">
                                            <a href="../../demo35/dist/account/referrals.html" class="menu-link px-5">Referrals</a>
                                        </div>
                                        {/*end::Menu item  */}
                                        {/*begin::Menu item  */}
                                        <div class="menu-item px-3">
                                            <a href="../../demo35/dist/account/billing.html" class="menu-link px-5">Billing</a>
                                        </div>
                                        {/*end::Menu item  */}
                                        {/*begin::Menu item  */}
                                        <div class="menu-item px-3">
                                            <a href="../../demo35/dist/account/statements.html" class="menu-link px-5">Payments</a>
                                        </div>
                                        {/*end::Menu item  */}
                                        {/*begin::Menu item  */}
                                        <div class="menu-item px-3">
                                            <a href="../../demo35/dist/account/statements.html" class="menu-link d-flex flex-stack px-5">Statements
                                                <span class="ms-2 lh-0" data-bs-toggle="tooltip" title="View your statements">
                                                    <i class="ki-outline ki-information-5 fs-5"></i>
                                                </span></a>
                                        </div>
                                        {/*end::Menu item  */}
                                        {/*begin::Menu separator  */}
                                        <div class="separator my-2"></div>
                                        {/*end::Menu separator  */}
                                        {/*begin::Menu item  */}
                                        <div class="menu-item px-3">
                                            <div class="menu-content px-3">
                                                <label class="form-check form-switch form-check-custom form-check-solid">
                                                    <input class="form-check-input w-30px h-20px" type="checkbox" value="1" checked="checked" name="notifications" />
                                                    <span class="form-check-label text-muted fs-7">Notifications</span>
                                                </label>
                                            </div>
                                        </div>
                                        {/*end::Menu item  */}
                                    </div>
                                    {/*end::Menu sub  */}
                                </div>
                                {/*end::Menu item  */}
                                {/*begin::Menu item  */}
                                <div class="menu-item px-5">
                                    <a href="../../demo35/dist/account/statements.html" class="menu-link px-5">My Statements</a>
                                </div>
                                {/*end::Menu item  */}
                                {/*begin::Menu separator  */}
                                <div class="separator my-2"></div>
                                {/*end::Menu separator  */}
                                {/*begin::Menu item  */}
                                <div class="menu-item px-5" data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="left-start" data-kt-menu-offset="-15px, 0">
                                    <a href="#" class="menu-link px-5">
                                        <span class="menu-title position-relative">Mode
                                            <span class="ms-5 position-absolute translate-middle-y top-50 end-0">
                                                <i class="ki-outline ki-night-day theme-light-show fs-2"></i>
                                                <i class="ki-outline ki-moon theme-dark-show fs-2"></i>
                                            </span></span>
                                    </a>
                                    {/*begin::Menu  */}
                                    <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-gray-500 menu-active-bg menu-state-color fw-semibold py-4 fs-base w-150px" data-kt-menu="true" data-kt-element="theme-mode-menu">
                                        {/*begin::Menu item  */}
                                        <div class="menu-item px-3 my-0">
                                            <a href="#" class="menu-link px-3 py-2" data-kt-element="mode" data-kt-value="light">
                                                <span class="menu-icon" data-kt-element="icon">
                                                    <i class="ki-outline ki-night-day fs-2"></i>
                                                </span>
                                                <span class="menu-title">Light</span>
                                            </a>
                                        </div>
                                        {/*end::Menu item  */}
                                        {/*begin::Menu item  */}
                                        <div class="menu-item px-3 my-0">
                                            <a href="#" class="menu-link px-3 py-2" data-kt-element="mode" data-kt-value="dark">
                                                <span class="menu-icon" data-kt-element="icon">
                                                    <i class="ki-outline ki-moon fs-2"></i>
                                                </span>
                                                <span class="menu-title">Dark</span>
                                            </a>
                                        </div>
                                        {/*end::Menu item  */}
                                        {/*begin::Menu item  */}
                                        <div class="menu-item px-3 my-0">
                                            <a href="#" class="menu-link px-3 py-2" data-kt-element="mode" data-kt-value="system">
                                                <span class="menu-icon" data-kt-element="icon">
                                                    <i class="ki-outline ki-screen fs-2"></i>
                                                </span>
                                                <span class="menu-title">System</span>
                                            </a>
                                        </div>
                                        {/*end::Menu item  */}
                                    </div>
                                    {/*end::Menu  */}
                                </div>
                                {/*end::Menu item  */}
                                {/*begin::Menu item  */}
                                <div class="menu-item px-5" data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="left-start" data-kt-menu-offset="-15px, 0">
                                    <a href="#" class="menu-link px-5">
                                        <span class="menu-title position-relative">Language
                                            <span class="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0">English
                                                <img class="w-15px h-15px rounded-1 ms-2" src="assets/media/flags/united-states.svg" alt="" /></span></span>
                                    </a>
                                    {/*begin::Menu sub  */}
                                    <div class="menu-sub menu-sub-dropdown w-175px py-4">
                                        {/*begin::Menu item  */}
                                        <div class="menu-item px-3">
                                            <a href="../../demo35/dist/account/settings.html" class="menu-link d-flex px-5 active">
                                                <span class="symbol symbol-20px me-4">
                                                    <img class="rounded-1" src="assets/media/flags/united-states.svg" alt="" />
                                                </span>English</a>
                                        </div>
                                        {/*end::Menu item  */}
                                        {/*begin::Menu item  */}
                                        <div class="menu-item px-3">
                                            <a href="../../demo35/dist/account/settings.html" class="menu-link d-flex px-5">
                                                <span class="symbol symbol-20px me-4">
                                                    <img class="rounded-1" src="assets/media/flags/spain.svg" alt="" />
                                                </span>Spanish</a>
                                        </div>
                                        {/*end::Menu item  */}
                                        {/*begin::Menu item  */}
                                        <div class="menu-item px-3">
                                            <a href="../../demo35/dist/account/settings.html" class="menu-link d-flex px-5">
                                                <span class="symbol symbol-20px me-4">
                                                    <img class="rounded-1" src="assets/media/flags/germany.svg" alt="" />
                                                </span>German</a>
                                        </div>
                                        {/*end::Menu item  */}
                                        {/*begin::Menu item  */}
                                        <div class="menu-item px-3">
                                            <a href="../../demo35/dist/account/settings.html" class="menu-link d-flex px-5">
                                                <span class="symbol symbol-20px me-4">
                                                    <img class="rounded-1" src="assets/media/flags/japan.svg" alt="" />
                                                </span>Japanese</a>
                                        </div>
                                        {/*end::Menu item  */}
                                        {/*begin::Menu item  */}
                                        <div class="menu-item px-3">
                                            <a href="../../demo35/dist/account/settings.html" class="menu-link d-flex px-5">
                                                <span class="symbol symbol-20px me-4">
                                                    <img class="rounded-1" src="assets/media/flags/france.svg" alt="" />
                                                </span>French</a>
                                        </div>
                                        {/*end::Menu item  */}
                                    </div>
                                    {/*end::Menu sub  */}
                                </div>
                                {/*end::Menu item  */}
                                {/*begin::Menu item  */}
                                <div class="menu-item px-5 my-1">
                                    <a href="../../demo35/dist/account/settings.html" class="menu-link px-5">Account Settings</a>
                                </div>
                                {/*end::Menu item  */}
                                {/*begin::Menu item  */}
                                <div class="menu-item px-5">
                                    <a href="../../demo35/dist/authentication/layouts/corporate/sign-in.html" class="menu-link px-5">Sign Out</a>
                                </div>
                                {/*end::Menu item  */}
                            </div>
                            {/*end::User account menu  */}


                            {/*end::Menu wrapper  */}
                        </div>
                        {/*end::User menu  */}
                        {/*begin::Header menu toggle  */}
                        <div class="app-navbar-item d-lg-none ms-2 me-n3" title="Show header menu">
                            <div class="btn btn-icon btn-color-gray-500 btn-active-color-primary w-35px h-35px" id="kt_app_header_menu_toggle">
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