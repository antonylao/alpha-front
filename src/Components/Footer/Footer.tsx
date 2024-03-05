import { Typography } from "@material-tailwind/react";
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between mt-8">
      <Typography color="blue-gray" className="font-normal">
        &copy; Projet Alpha
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Typography
            as="a"
            href="#A propos de nous"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            A propos de nous
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#Nous contacter"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Nous contacter
          </Typography>
        </li>
        <li>
        <Typography
            as="a"
            href="#facebook"
            variant="lead"
            color="blue"
            textGradient
          >
            <FaFacebook color="blue" size={25} />
          </Typography>
        </li>
        <li>
        <Typography
            as="a"
            href="#twitter"
            variant="lead"
            color="cyan"
            textGradient
          >
            <div className="flex">
              <BsTwitterX color="black" size={25} className="mr-5"/>
              <FaTwitter color="cyan" size={25} className="ml-5"/>
            </div>
          </Typography>
        </li>
        <li>
        <Typography
            as="a"
            href="#instagram"
            variant="lead"
            color="pink"
            textGradient
          >
            <FaInstagram color="pink" size={25} />
          </Typography>
        </li>
      </ul>
    </footer>
  );
}