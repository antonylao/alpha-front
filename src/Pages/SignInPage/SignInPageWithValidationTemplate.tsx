import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

//* DONE: imports
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { SignInFormInterface } from "../../services/utils/CustomTypes";
import { YupUtils } from "../../services/utils/YupUtils";


export function SignInPageWithValidationTemplate() {
  //* DONE: initializations
  const schema = yup.object().shape({
    email: YupUtils.constraints.email.required("Email requis"),
    password: YupUtils.constraints.password.required("Mot de passe requis")
  })
  //register determines the keys of the object form. In inputs, {...register("<key>")}
  //formState takes the error messages and display them. Error messages are defined in the parameter of the required
  const { register, handleSubmit, formState: { errors } } = useForm({
    //link yup to React-Hook-Form
    resolver: yupResolver(schema)
  })

  //* DONE: onSubmit def
  const onSubmit = (data: SignInFormInterface) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
  }

  return (

    <Card color="transparent" shadow={false}>
      <div className="flex justify-center bg-cover bg-center " >
        //* DONE:  onSubmit property
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white opacity-95 p-10 rounded-md mt-8 mb-8 w-80 max-w-screen-lg sm:w-96">
          <Typography className="mb-8" variant="h4" color="blue-gray">
            Sign In
          </Typography>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              //* DONE: remove name property
              // name="email"
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              //* DONE: add {...register}
              {...register("email")}
            />
            //* DONE: add error message
            <Typography variant="paragraph" color="red" >{errors.email?.message}</Typography>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              //* DONE remove name property
              // name="password"
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              //* DONE add {...register}
              {...register("password")}
            />
            //* DONE add error message
            <Typography variant="paragraph" color="red" >{errors.password?.message}</Typography>
          </div>

          //* DONE: button type submit
          <Button type="submit" className="mt-6" fullWidth>
            sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            <a href="#" className="font-medium text-gray-900">
              Mot de passe oublié ?
            </a>
          </Typography>
        </form>

      </div>
    </Card>
  );
}