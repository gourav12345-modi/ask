import { Alert } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import * as api from "../api"
import Question from '../components/Question';
import { useSelector } from 'react-redux';

function SearchQuestion() {
  const {userId} = useSelector((state) => state.userData)

  const [questions, setQuestions] = useState([])
  const [errors, setErrors] = useState({})

  useEffect(() => {
    async function fetchQuestionData() {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const queryString = params.get('query');
      if(!queryString) {
        setErrors({message: "No serch query found to view questions." })
        return 
      }
      try {
        const { data } = await api.getQuestionsByQuery(queryString)
        setQuestions(data)
      } catch (error) {
        console.log(error)
        setErrors(error?.response?.data)
      }
    }
    fetchQuestionData()
  }, [])

  return (
    <div className="search-page py-10">
      {
        errors?.message && (
          <Alert color="red" className='w-fit min-w-[400px] mx-auto'>{errors.message}</Alert>
        )
      }

      <div className="questions-container flex flex-wrap">
        {
          questions?.map((question) => (
            <Question {...question} currentUserId={userId} cardClassName="w-96" />
          ))
        }
        {
          questions?.length === 0 && (<Alert color="blue" className='w-fit min-w-[400px] mx-auto'>No question match found.</Alert>)
        }
      </div>
    </div>
  )
}

export default SearchQuestion