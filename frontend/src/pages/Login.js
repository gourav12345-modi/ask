import React, { useState } from 'react'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import jwt_decode from "jwt-decode"
import { Link, useNavigate } from 'react-router-dom';
import * as api from "../api"
import { useDispatch } from 'react-redux';
import { SET_USER_DATA } from '../constants';

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const loginUser = async () => {
    try {
      const { data } = await api.login(userData)
      const token = data.token
      const {userId, username} = jwt_decode(token)
      dispatch({ type: SET_USER_DATA, payload: {token: data.token, userId, username}})

      setErrors({})
      navigate("/")
    } catch (error) {
      console.log(error)
      setErrors(error?.response?.data)
    }
  }

  return (
    <div className="regiser-page">
      <Card color="transparent" shadow={false} className="mt-4">
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to login.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
          <div className="mb-4 flex flex-col ">

            {
              errors.message && (
                <Alert color="red" className='w-full'>{errors.message}</Alert>

              )
            }

            <div className="mt-4">
              <Input size="lg" label="Username" name="username" value={userData.username} onChange={handleInputChange} />
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                {errors?.username}
              </Typography>
            </div>
            <div className="mt-4">
              <Input type="password" size="lg" label="Password" name="password" value={userData.password} onChange={handleInputChange} />
              <Typography
                variant="small"
                color="gray"
                className="flex items-center  font-normal"
              >
                {errors?.password}
              </Typography>
            </div>
          </div>

          <Button className="mt-6" fullWidth onClick={loginUser}>
            Login
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Do not have an account?{" "}
            <Link to="/register" className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>

    </div>
  )
}

export default Login