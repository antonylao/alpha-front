import { Card, CardBody, CardFooter } from "@material-tailwind/react";
import { FaPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Create() {
  return (
    <Card className="w-full max-w-[26rem] shadow-lg">
      <CardBody className="flex justify-center items-center h-40">
      <Link to={`/create-event/`}>
        <FaPlusSquare
          style={{ width: "150px", height: "150px" }}
          className="my-auto"
        />
        </Link>
      </CardBody>
      <CardFooter className="mt-10 pt-3">
        <div className="flex justify-around ">
          <div className="border border-black rounded full bg-blue-500 p-1">
            01
          </div>
          <div className="border border-black rounded full bg-orange-500 p-1">
            02
          </div>
          <div className="border border-black rounded full bg-red-500 p-1">
            03
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
