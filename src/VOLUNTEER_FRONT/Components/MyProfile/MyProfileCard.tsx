import { PopOverRating } from "./PopOverRating/PopOverRating"
import { FormModifyProfile } from "./ModifyProfile/FormModifyProfile";
import { fakerprofile } from "../../Pages/MyProfile/fakerprofile";
import { useState } from "react";
import {
  Card,
  Typography,
} from "@material-tailwind/react";

interface Volunteer {
  id: number
  firstName: string
  lastName: string
  email: string,
  password: string,
  phoneNumber: string
  // profilePicture: File
  profilePicture: string,
}


export function ProfileCard() {

  const volunteerId = 1
  const volunteer = fakerprofile.datas.filter((obj) => obj.id === volunteerId)[0]
  const [profile, setProfile] = useState<Volunteer>(volunteer)
  console.log("volunteer from my profile card", volunteer)

  const profileUpdate = (data: any) => {
    data.profilePicture = '/profile_picture.jpg'
    setProfile({ ...data })
  }


  return (
    <>
      <Card className="border rounded m-5 bg-slate-200 shadow-slate-500">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1">
          <div className="ProfilePicture m-5">
            <img src={profile.profilePicture} alt="profile-picture" className="h-96 w-96 rounded-full object-cover" />
          </div>
          <div className="Info-details mt-10 object-center">
            <Typography className="m-8">
              {profile.firstName} {profile.lastName}
            </Typography>
            <div className="m-8">
              {profile.email}
            </div>
            <div className="m-8">
              {profile.phoneNumber}
            </div>
            <div className="m-8 flex justify-center">
              <PopOverRating />
            </div>
            <div className="m-8">
              <div><p className="mt-10 mb-3">Modifier mon profil:</p></div>
              <button><FormModifyProfile newProfile={profileUpdate} /></button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
