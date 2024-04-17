import { Avatar } from "@material-tailwind/react";

export function ProfileIcon(props: any) {

  const { profilePicture } = props
  return (
    <>
      <Avatar
        variant="circular"
        size="sm"
        alt="Volunteer Profile Picture"
        className="border border-gray-900 p-0.5"
        src={profilePicture} />
    </>
  )
}