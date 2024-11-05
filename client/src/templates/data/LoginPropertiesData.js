
export const Loginproperties = [{
    "label": {
      "name": "UserID",
      "class": "",
      "style": {}
    },
    "input": {
      "id": "Username",
      "class": "form-control form-control-solid ",
      "type": "text",
      "placeholder": "Username",
      "disabled": "",
      "required": true,
      
      //"pattern":/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ,
      "style":{border:"0.1px solid",borderColor:"#000000"},
      "pattern":/^[a-zA-Z0-9]{5,15}$/
    },
    "container": {
      "class": "form-group ",
      "style": {marginBottom:"15px"}
    },
    "Auth":true,
  },
  {
    "label": {
      "name": "Password",
      "class": "",
      //"style":{color:"black",display:"inline-block"}
    },
    "input": {
      "id": "Password",
      "class": "form-control form-control-solid ",
      "type": "password",
      "placeholder": "Password",
      "disabled": "",
      "required": true,
      "pattern":/^[a-zA-Z0-9]{6,15}$/,
      "style":{border:"0.1px solid",borderColor:"#000000"}
  
    },
    "container": {
      "class": "form-group",
      //"style": {marginBottom:"10px"}
    },
    "Auth":true,
  }
  ]

  export const ButtonProperties = {
    container:{
          "id":"login-button",
           "class":"form-actions ",
           "style":{justifyContent:"center",display:"flex",marginTop:"15px"},
      
    },
    button:{
         "class":"btn py-3 px-20 uppercase",
        //  "style":{backgroundColor:"#065590",color:"#ffff"},
      //      type:'submit',
      //       value:'Submit'
       "name":"LOGIN"
    }
  
  }