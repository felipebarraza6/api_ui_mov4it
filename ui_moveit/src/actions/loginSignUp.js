import api from "../api/endpoints";
import { notification } from "antd";
import { validate } from 'rut.js'

export const login = async (values, dispatch) => {

  values = {
    ...values,
    email: values.email.toLowerCase()
  }

  const rq = await api.authentication
    .login(values)
    .then((r) => {
      notification.success({ message:'Has ingresado correctamente!' })
      notification.success({ message: `Bienvenido ${r.user.first_name.charAt(0).toUpperCase() + r.user.first_name.slice(1)}!`})
      dispatch({
        type: "LOGIN",
        payload: r,
      });
    })
    .catch((r) => {
      if (r.response) {
        notification.error({
          message: r.response.data.non_field_errors[0],
        });
      }
    });

  return rq;
};


export const signUp = async(values, dispatch, type_user) => {
  values = {
    ...values,
    username: `${values.first_name.slice(0,3).toLowerCase()}${values.last_name.slice(0,3).toLowerCase()}${values.phone_number.slice(0,4)}`,
    type_user: type_user 
  }

  if(values.password !== values.password_confirmation){
    notification.error({message:'Las contraseña de confirmación no coincide, vuelve a intentarlo...'})
  } else{
const rq = await api.authentication
    .signup(values)
    .then((r) => {
      notification.success({message:'Has crado tu usuario correctamente!'})
      login({ email: values.email.toLowerCase(), password: values.password_confirmation }, dispatch)
    })
    .catch((err) => {
      if(err.response.data){
        Object.keys(err.response.data).map((key)=> {
            let field = key
            let message = err.response.data[key]
          if(key==='non_field_errors'){
            field='Error'
          }
          if(key==='identification_number'){
            field='Rut o Pasaporte'
          }
          if(key==='phone_number'){
            field='Número de telefono'
          }
          notification.error({message:`${field.toUpperCase()}: ${message}`})
        })
    }
    })

  return rq
  }
  
  
  console.log(values)
}
