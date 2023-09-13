import React, { useEffect, useState } from 'react'
import { Input, Textarea, Chip, Typography, Button, Collapse, Card, CardBody, Alert } from "@material-tailwind/react";
import * as api from "../api"
import {  REQUEST_FAILURE, REQUEST_INITIATED, REQUEST_NOT_INITIATED, REQUEST_SUCCESS } from '../constants';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function EditQuestion() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [question, setQuestion] = useState({
    _id: "",
    title: "",
    body: "",
    tags: [],
  })
  const [tagInput, setTagInput] = useState("")
  const [errors, setErrors] = useState({})
  const [questionEditState, setQuestionEditState] = useState(REQUEST_NOT_INITIATED)

  useEffect(() => {
    async function fetchQuestionData() {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const questionId = params.get('id');
      if(!questionId) {
        setErrors({message: "No question found to edit." })
        setTimeout(() => {
          navigate("/")
        }, 2000)
      }
     
      try {
        const { data } = await api.getQuestion(questionId)
        setQuestion(data)
      } catch (error) {
        console.log(error)
        setErrors(error?.response?.data)
      }
    }
    fetchQuestionData()
  }, [])

  const handleAddTag = (e) => {
    if (e.key !== "Enter") return;
    setQuestion({
      ...question,
      tags: [...question.tags, tagInput]
    })
    setTagInput("")
  }

  const handleEditQuestion = async () => {
    try {
      setQuestionEditState(REQUEST_INITIATED)
      await api.editQuestion(question._id, question)
      setErrors({})
      setQuestionEditState(REQUEST_SUCCESS)
      setTimeout(() => {
        setQuestionEditState(REQUEST_NOT_INITIATED)
        navigate("/")
      }, 2000)
    } catch (error) {
      console.log(error)
      setErrors(error?.response?.data)
      setQuestionEditState(REQUEST_FAILURE)
    }
  }

  return (
    <div className="create-question-page ">
      <div className=" py-10 max-w-[500px] mx-auto  ">

        <Typography variant="h5" className="text-left mb-12">Edit your question details bellow.</Typography>

        {
          errors?.message ? (<Alert color="red" className='w-full'>{errors.message}</Alert>) :
            questionEditState === REQUEST_SUCCESS && (<Alert color="green" className='w-full'>Question Updated Successfully. Redirecting to Home page</Alert>)
        }

        <div className="my-6 mx-2">
          <Input variant="static" label="Title" placeholder="Add your title" value={question.title} onChange={(e) => setQuestion({ ...question, title: e.target.value })} />
          <Typography
            variant="small"
            color="gray"
            className="flex justify-start font-normal"
          >
            {errors?.title}
          </Typography>
        </div>
        <div className="my-6 mx-2">
          <Textarea label="Body" value={question.body} onChange={(e) => setQuestion({ ...question, body: e.target.value })} />

        </div>
        <div className="tags-containe my-6 mx-2">
          <div className="w-full">
            <Input variant="static" label="Tags" value={tagInput} className="px-2" placeholder="write and press enter to add tag." onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleAddTag} />
          </div>
          <div className="tags flex flex-wrap mt-2">
            {
              question.tags.map((tag) => (
                <Chip className="m-1" value={tag}
                  onClose={(e) => {
                    const newTagList = question.tags.filter((currentTag) => currentTag !== tag)
                    setQuestion({ ...question, tags: newTagList })
                  }
                  }
                />
              ))
            }
          </div>
        </div>

        <Button onClick={handleEditQuestion} disabled={questionEditState === REQUEST_INITIATED}>
          {
            questionEditState === REQUEST_INITIATED ? "Updating" :
              "Update"
          }</Button>
      </div>
    </div>
  )
}

export default EditQuestion