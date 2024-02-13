import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Card, 
  Typography
} from "@material-tailwind/react";
import { RatingDone } from "../../Rating/RatingDone";
import { RatingPending } from "../../Rating/RatingPending";

const TABLE_HEAD = ["Titre", "Date et heure", "Tâche", "Note", ""];
 
const TABLE_ROWS = [
  {
    title: "John Michael",
    date: "23/04/18",
    task: "Manager",
    rating: 1
  },
  {
    title: "Alexa Liras",
    date: "23/04/18",
    task: "Developer",
    rating: undefined
  },
  {
    title: "Laurent Perrier",
    date: "19/09/17",
    task: "Executive",
    rating: 5
  },
  {
    title: "Michael Levi",
    date: "24/12/08",
    task: "Developer",
    rating: undefined
  },
  {
    title: "Richard Gran",
    date: "04/10/21",
    task: "Manager",
    rating: 4
  },
];

export function PastEventsModal() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

  
 
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Open Dialog XL
      </Button>

      <Dialog
        open={open}
        size="xl"
        handler={handleOpen}
      >
        <DialogHeader>Events passés pour le bénévole</DialogHeader>
        <DialogBody>
          <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(({ title, date, task, rating }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
      
                  return (
                    <tr key={title}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {title}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {task}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {rating ? <RatingDone value={rating} /> : <RatingPending />}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {rating ? '': <Button>Appliquer</Button>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </DialogBody>
      </Dialog>
    </>
  );
}