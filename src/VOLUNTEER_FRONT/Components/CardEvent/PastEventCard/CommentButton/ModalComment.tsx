import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";
import { CommentButton } from "./CommentButton";
import axios from "axios";
import { updateVolunteerAssignmentComment } from "../../../../../services/api/volunteer_assignments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ENABLE_LOGS } from "../../../../../services/utils/Logs";

const logs = false

export function ModalComment(props: any) {
  const { ids, comment, commentApplied } = props
  if (logs && ENABLE_LOGS) { console.log("🚀 ~ ModalComment ~ comment:", comment) }
  const [open, setOpen] = React.useState(false);
  const [commentContent, setCommentContent] = useState(comment)
  const [commentPresentInDB, setCommentPresentInDB] = useState<boolean>(comment ? true : false)

  if (logs && ENABLE_LOGS) { console.log(ids) }

  //set comment with a useMutation
  const queryClient = useQueryClient();
  const updateComment = useMutation({
    // mutationFn: ({ ids, newVal }: any) => {
    //   return axios.patch(`https://jsonplaceholder.typicode.com/posts/patch/${ids.eventId}`, newVal)
    // },
    // doesn't return the correct value with a faker
    mutationFn: ({ ids, newVal }) => {
      return updateVolunteerAssignmentComment({ ids, newVal })
    },

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

  const handleChange = (e: any) => {
    setCommentContent(e.target.value)
  }

  const handleClick = () => {
    //button doesnt work if there is no comment
    if (!commentContent) { return }
    updateComment.mutate({ ids, newVal: commentContent })
    //* useMutation equivalent, without invalidating query keys
    // updateVolunteerAssignmentComment({ ids, newVal: commentContent })

    setCommentPresentInDB(true)
    commentApplied()
    handleOpen()
  }




  return (
    <>
      <CommentButton onClick={handleOpen} />
      <Dialog open={open} handler={handleOpen}>
        <DialogBody>
          {commentPresentInDB ? <Textarea disabled label="Commentaire" value={commentContent} /> :
            <Textarea label="Commentaire" onChange={handleChange} />}

        </DialogBody>
        <DialogFooter>
          {(!commentPresentInDB) &&
            <Button variant="gradient" onClick={handleClick}>
              <span>Envoyer</span>
            </Button>}
        </DialogFooter>
      </Dialog>
    </>
  );
}
