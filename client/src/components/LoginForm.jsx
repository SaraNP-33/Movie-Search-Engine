import { useState, useEffect } from 'react';
import {Form, Container, Button, Alert} from 'react-bootstrap'
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

function LoginForm() {
 const[formData, setFormData]=useState({email:'', password:''})
 console.log(formData);
 const [validated] = useState(false)
 const [showAlert, setShowAlert] = useState(false)

 const [login, {error}] =useMutation(LOGIN_USER)

 useEffect(()=>{
    if(error){
      setShowAlert(true)
    }else{
      setShowAlert(false)
    }
 },[error])

 const handleInputChange =(event) =>{
  const {name, value} = event.target;
  setFormData({...formData, [name]: value})
 }

 const handleFormSubmit =async (event) =>{
  event.preventDefault()

  const form =event.currentTarget;
  if(form.checkValidity()===false){
    event.preventDefault()
    event.stopPropagation();
  }

  try{
    const {data} =await login({
      variables: {...formData}
    })
    console.log(data);
    Auth.login(data.login.token)

  }catch (e) {
      console.error(e);
    }

    setFormData({
      email: '',
      password: '',
    });

 }
  return (
    <Container id="login-box">
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
        dismissible
        onClose={()=>setShowAlert(false)}
        show={showAlert}
        variant='danger'
        >
          Oops... Something went wrong!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" 
        required
        onChange={handleInputChange}
        value={formData.email}/>
        <Form.Control.Feedback type='invalid'>
          Email is required
        </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" 
        required
        onChange={handleInputChange}
        value={formData.password}/>
        <Form.Control.Feedback type='invalid'>
          Password is required
        </Form.Control.Feedback>
        </Form.Group>
        <div id="position-btn">
      <Button id="login-btn" className="mt-3"type="submit">Submit</Button>
      </div>
      </Form>
    </Container>
  );
}

export default LoginForm;