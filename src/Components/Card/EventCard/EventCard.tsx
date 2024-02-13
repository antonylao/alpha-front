import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import { Delete } from "../../Buttons/DeleteEvent/Delete";
import { Edit } from "../../Buttons/EditEvent/Edit";
import { Duplicate } from "../../Buttons/DuplicateEvent/Duplicate";

export function EventCard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const result = await response.json();
        setPosts(result);
        console.log(result);
      } catch (error) {
        console.error("Erreur lors de la requête API :", error);
      }
    };
    fetchData();
    return () => {};
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map((post, index) => (
          <div key={index}>
            <Card className="w-full max-w-[26rem] shadow-lg">
              <CardHeader floated={false} color="blue-gray">
                <img
                  src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt="ui/ux review check"
                />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
              </CardHeader>
              <CardBody>
                <div className="mb-3 flex justify-center items-center flex-wrap">
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="font-medium mr-5"
                  >
                    {post.title}
                  </Typography>
                  <div
                    className={`border border-black rounded-full ${
                      post.id === 1
                        ? "bg-blue-500"
                        : post.id === 2
                        ? "bg-orange-500"
                        : post.id === 3
                        ? "bg-red-500"
                        : ""
                    }`}
                  >
                    {post.id}
                  </div>
                </div>
                <Typography color="gray">{post.body}</Typography>
              </CardBody>
              <CardFooter>
                <div className="flex items-center">
                  <div>{post.id}</div>
                  <div className="flex items-center ml-auto space-x-1">
                    <div className="m-1">
                      <Edit />
                    </div>
                    <div className="m-1">
                      <Duplicate />
                    </div>
                    <div className="m-1">
                      <Delete />
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
