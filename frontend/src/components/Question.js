import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Chip
} from "@material-tailwind/react";
import { AiOutlineEdit } from "react-icons/ai"
import { Link } from "react-router-dom"

function Question({ _id, title, body, tags, answers, creator, currentUserId }) {

  return (
    <Card className="m-4 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2 text-left">
          {title}
        </Typography>
        <Typography className="text-left">
          {
            body.length > 70 ? (body.substring(0, 70) + "...") : body
          }
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <div className="flex flex-wrap items-center">
        <Link to={`/edit?id=${_id}`}>
          <Chip value="Edit" color="indigo" />
        </Link>
       
        <Chip value={`${answers.length} ${answers.length > 1 ? "answers" : "answer"}`} className="w-fit m-1" color="indigo" />
        
        </div>
        <div className="flex flex-wrap">
        {
          tags.map((tag) => (
            <Chip value={tag} className="w-fit m-1" />

          ))
        }
        </div>


      </CardFooter>
    </Card>
  )
}

export default Question
