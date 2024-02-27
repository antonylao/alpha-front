import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";
import { CommentButton } from "./CommentButton";
import axios from "axios";
import { updateVolunteerAssignmentComment } from "../../../../../services/api/volunteer_assignments";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function ModalComment(props) {
  const { ids, comment, commentApplied } = props
  const [open, setOpen] = React.useState(false);
  const [commentContent, setCommentContent] = useState(comment)

  console.log(ids)

  //set comment with a useMutation
  const queryClient = useQueryClient();
  const updateComment = useMutation({
    mutationFn: ({ ids, newVal }) => {
      return axios.patch(`https://jsonplaceholder.typicode.com/posts/patch/${ids.eventId}`, newVal)
    },
    // doesn't return the correct value with a faker
    // mutationFn: ({ ids, newVal }) => {
    //   return updateVolunteerAssignmentComment({ ids, newVal })
    // },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`FinishedEvents`], refetchType: 'all' })
    },
    onError: () => {
    }
  })

  useEffect(() => {
    setCommentContent(comment)
  }, [comment])




  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    setCommentContent(e.target.value)
  }

  const handleClick = () => {
    //use mutation fn to apply change to db: doesn't work for now
    // updateComment.mutate(ids, commentContent)
    // useMutation equivalent, without invalidating query keys
    updateVolunteerAssignmentComment({ ids, newVal: commentContent })

    commentApplied()
    handleOpen()
  }




  return (
    <>
      <CommentButton onClick={handleOpen} variant="gradient" />
      <Dialog open={open} handler={handleOpen}>
        <DialogBody>
          {comment ? <Textarea disabled label="Commentaire" value={commentContent} /> :
            <Textarea label="Commentaire" onChange={handleChange} />}

        </DialogBody>
        <DialogFooter>
          {(!comment) &&
            <Button variant="gradient" onClick={handleClick}>
              <span>Envoyer</span>
            </Button>}
        </DialogFooter>
      </Dialog>
    </>
  );
}