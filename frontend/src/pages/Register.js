import React, { useState } from 'react'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import * as api from "../api"

function Register() {
  const navigate = useNavigate()

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

  const registerUser = async () => {
    try {
      await api.register(userData)
      setErrors({})
      navigate("/login")
    } catch (error) {
      console.log(error)
      setErrors(error?.response?.data)
    }
  }

  return (
    <div className="regiser-page">
      <Card color="transparent" shadow={false} className="mt-4">
        <Typography variant="h4" color="blue-gray">
          Register
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
          <div className="mb-4 flex flex-col ">
          <Typography
              variant="small"
              color="gray"
              className="flex justify-center font-normal"
            >
              {errors?.message}
            </Typography>
            <div className="mt-4">
            <Input size="lg"  label="Username" name="username" value={userData.username} onChange={handleInputChange} />
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              {errors?.username}
            </Typography>
            </div>
           <div className="mt-4">
           <Input type="password" size="lg"  label="Password" name="password" value={userData.password} onChange={handleInputChange} />
            <Typography
              variant="small"
              color="gray"
              className="flex items-center  font-normal"
            >
              {errors?.password}
            </Typography>
           </div>
          </div>

          <Button className="mt-6" fullWidth onClick={registerUser}>
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>

    </div>
  )
}

export default Register