import React from "react";
import { useState } from 'react';
import { faker } from "./faker";
// import { useForm } from 'react-hook-form'  
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Avatar,
} from "@material-tailwind/react";

interface User {
  email: string; 
  password: string, 
  confirmPassword: string
}
 
export function DialogWithForm() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  // HookForm
  // const { register, handleSubmit } = useForm()


  const [organiser, setOrganiser] = useState<User[]>([])

  const [form, setForm] = useState<User>({
      email: '',
      password: '', 
      confirmPassword: ''
  });


    function handleSubmit(e: any) {
      console.log("fonction appelee")
      e.preventDefault();
      console.log("handlesubmit organiser", form)
      if (form.password !== form.confirmPassword){
        console.log("err")
        return
      }
      console.log('from handlesubmit', form.password)
      console.log('from handlesubmit', form.confirmPassword)
      setOrganiser([...organiser, form])
      setForm({
        email: '',
        password: '', 
        confirmPassword: ''
      })
      console.log("handlesubmit organiser", organiser)
      handleOpen()
  }

  function handleChange(evt: any) {
    const { name, value } = evt.target
     setForm({...form, [name] : value } )
     console.log("value", value)
 }


 
  return (
    <>
        <Avatar
          onClick={handleOpen}
          variant="circular"
          size="sm"
          alt="canneton"
          className="border border-gray-900 p-0.5"
          src="https://www.zooplus.fr/magazine/wp-content/uploads/2017/10/Kanarienvogel-768x512.jpg"/>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <form onSubmit={(evt) => handleSubmit(evt)}>
        {/* <form onSubmit={handleSubmit((data: any) => {
          console.log("HookForm", data)
        })}> */}
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography 
                variant="h4" 
                color="blue-gray"
                >
                Modifier mon profile
              </Typography>
              <Typography
                className="mb-3 font-normal"
                variant="paragraph"
                color="gray"
              >
                Remplissez les champs à modifier
              </Typography>
                <Typography
                  className="-mb-2" 
                  variant="h6"
                  >
                  Adresse mail
                </Typography>
                <Input 
                  label={faker.datas[0].email}
                  size="lg"
                  name="email"
                  // {...register("email")}  // HookForm 
                  value={form.email}
                   onChange={(evt) => handleChange(evt)}
                  />
                <Typography 
                  className="-mb-2" 
                  variant="h6"
                  >
                  Nouveau mot de passe
                </Typography>
                <Input 
                  label="" 
                  size="lg" 
                  type="password"
                  crossOrigin={undefined} 
                  name="password" 
                  // {...register("password")} // hookForm
                  value={form.password}
                  autoComplete="off"
                   onChange={(evt) => handleChange(evt)}
                  />
                <Typography 
                  className="-mb-2" 
                  variant="h6"
                  >
                  Confirmer le nouveau mot de passe
                </Typography>
                <Input 
                  label="" 
                  size="lg" 
                  type="password"
                  crossOrigin={undefined}
                  name="confirmPassword" 
                  // {...register("confirmPassword")} // HookForm
                  value={form.confirmPassword}
                  autoComplete="off"
                   onChange={(evt) => handleChange(evt)}
                  />
            </CardBody>
            <CardFooter className="pt-0 flex justify-between">
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className=""
              >
              <span>Annuler</span>
            </Button>
            <Button 
              variant="gradient"
              color="green" 
              type="submit"
              onClick={handleSubmit}
              >
                <span>Enregistrer</span>
            </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
}