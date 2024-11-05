import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { InputComponent, ButtonComponent } from '../../templates/formelement/LoginForm'
import { Loginproperties, ButtonProperties } from '../../templates/data/LoginPropertiesData';
import LoginHeader from './LoginHeader';
import HttpClient from '../config/HttpConfig';
import host from '../config/config'


const Styles = {
  mainContainer: {
    height: "100vh",
    width: "100%",
    display: "flex",
    // backgroundImage: "radial-gradient(50% 116%,#384A98 45%,#1A245F 100%)",
    justifyContent: "center"
  },
  // form: {
  //   position: "absolute",
  //   top: "35%",
  //   left: "50%",
  //   transform: " translate(-50%, -35%)",
  //   width: "375px"
  // },
  logincontainer: {
    position: "absolute",
    top: "35%",
    left: "50%",
    transform: " translate(-50%, -35%)",
    width: "375px"
  },
  headerarea: {
    position: "absolute",
    top: "0px",
    left: "0px"
  },
  brandlogo:{
    objectFit:"contain"
  },
  logowidth:{
    width:"400px"
  }
}



const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [userNameError, setUserNameError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [validationError, setValidationError] = useState(false);
  const [errorText, setErrorText] = useState("")

  const navigate = useNavigate();


  // Form Submission

  const handlesubmit = (e) => {
    e.preventDefault();

    // login Validation
    // const emailPattern = Loginproperties[0].input.pattern;
    // const passwordPattern = Loginproperties[1].input.pattern;
    setUserNameError("");
    setErrorText("");
    setPasswordError("");

    if (username === "" && password === "") {

      setValidationError(true)
      setErrorText('Please enter your Username and Password');
      return;
    }
    else if (username === "") {
    
      setUserNameError("Please Enter your Username");
      return;
    }
    else if (password === "") {
      setPasswordError("Please Enter your Password ");
      return;
    } else if (!/^[a-zA-Z0-9]{5,15}$/.test(username)) {
      setUserNameError("Incorrect Username or Password");
      return;
    }
    else if (!/^[a-zA-Z0-9]{6,15}$/.test(password)) {
      setPasswordError("Password must between 6 to 15 characters long");
      return;
    }







    // Login request to API
    const userdata = { username, password };
    console.log(userdata);

    axios({
      method: 'post',
      url: host.URL+host.PORT+'/api/login',
      data: userdata,
      headers: { 'Content-Type': 'application/json' }
    })

      .then(response => {
        console.log(response.data)
        if (response.data.location === "accessDenied") {
          setValidationError(true)
          setErrorText("Invalid Credentials")
        }  else if (response.data.status === "error") {
          setValidationError(true)
          setErrorText("Invalid Credentials")
        }
        else {
          sessionStorage.setItem('jwtToken', response.data.jwtToken);
          sessionStorage.setItem('userName', response.data.firstName +' '+response.data.lastName);
          console.log(response.data.jwtToken)

          navigate('/dashboard');
        }
      })
      .catch(error => {
        console.error(error.message);
      });


  }







  return (
    <div style={Styles.mainContainer} class="content">
      {/* <div class="header-area" style={Styles.headerarea}>
        <LoginHeader />

      </div> */}
      <div style={Styles.logincontainer}>
        <div className="login-logo-wrapper mb-10">
          <div className="logo-container ">

            <a   style={Styles.brandlogo}>
            <img alt="Logo" src="assets/media/logos/Astronics.png" style={Styles.logowidth}/>
              {/* <img alt="Logo" src="assets/media/logos/Aex-logo.svg" className="px-10" /> */}
              {/* <img alt="Logo" src="assets/media/logos/Aex-logo.svg" /> */}
              {/* <img alt="Logo" src="assets/media/logos/Aex-logo.png"  /> */}
            </a>
           
          </div>
        </div>
        <form style={Styles.form} className="login-form">

          <InputComponent
            data={Loginproperties[0]}
            handler={(e) => setUsername(e.target.value)}
            value={username}
            error={userNameError}
          />
          <InputComponent
            data={Loginproperties[1]}
            value={password}
            handler={(e) => setPassword(e.target.value)}
            error={passwordError}
          />
          <br></br>
          <div class='md-pb-10' style={{ fontSize: "18px" }}><span className='float-left text-danger fw-bold'>{validationError && errorText}</span></div>

          <ButtonComponent data={ButtonProperties} events={handlesubmit} />

        </form>
      </div>
    </div>



  )
}

export default Login;