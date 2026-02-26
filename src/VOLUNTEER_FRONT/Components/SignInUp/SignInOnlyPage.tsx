import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { YupUtils } from "../../../services/utils/YupUtils";
import { SignInFormInterface } from "../../../services/utils/CustomTypes";
import { signIn } from "../../../services/api/auth";



export function SignInVolunteerOnlyPage() {

  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: YupUtils.constraints.email.required("Email requis"),
    password: YupUtils.constraints.password.required("Mot de passe requis")
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (form: SignInFormInterface) => {

    //submit form action
    // async function signInVolunteer() {
    try {
      const data = await signIn("volunteer", form)
      console.log("🚀 ~ handleSubmit ~ data:", data)

      //store accessToken & refreshToken in localStorage
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);

      // redirect to event page if connection successful
      navigate('/volunteer_front_events');
    } catch (error: any) {
      console.error(error.response.data)
      //stay on sign up and display error message
    }
  }


  return (
    <Card color="transparent" shadow={false}>
      <div className="flex justify-center bg-cover bg-center bg-[url('https://www.premier-ltd.com/wp-content/uploads/2018/04/Manchester-Central-Events.jpg')]" >
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white opacity-95 p-10 rounded-md mt-8 mb-8 w-80 max-w-screen-lg sm:w-96">
          <Typography className="mb-8" variant="h4" color="blue-gray">
            Connection
          </Typography>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="nom@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              data-cy="SignInemail"
              {...register("email")}
            />
            <Typography variant="paragraph" color="red" >{errors.email?.message}</Typography>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Mot de passe
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("password")}
              data-cy="SignInpassword"
            />
            <Typography variant="paragraph" color="red" >{errors.password?.message}</Typography>
          </div>

          <Button type="submit" className="mt-6" fullWidth data-cy="SignInButton">
            Sign In
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            {/*! replace href after making forgotten password page*/}
            <a href="#" className="font-medium text-gray-900">
              Mot de passe oublié ?
            </a>
          </Typography>
        </form>


      </div>
    </Card>
  );
}
