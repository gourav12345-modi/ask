import React from 'react'
import { useSelector } from "react-redux"
import Question from '../components/Question'
import { Alert } from '@material-tailwind/react'

function Home() {
  const { questions } = useSelector((state) => state.questionData)
  const { userId } = useSelector((state) => state.userData)

  return (
    <div className="questions px-4  py-10">
      {
        !userId && (
          <Alert color="blue" className='w-fit min-w-[400px]'>Please login to ask a question</Alert>
        )
      }
      <div className="questions-container flex flex-wrap">
        {
          questions?.map((question) => (
            <Question {...question} currentUserId={userId} />
          ))
        }
      </div>

    </div>
  )
}

export default Home