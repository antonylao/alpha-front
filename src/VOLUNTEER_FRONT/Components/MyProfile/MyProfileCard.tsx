import { MdModeEdit } from "react-icons/md";
// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
import { PopOverRating } from "./PopOverRating/PopOverRating"
import {
    Card,
    Typography,
} from "@material-tailwind/react";

export function ProfileCard() {

    let volonteer = {
        id: 1,
        firstname: 'Leanne',
        lastname: 'Graham',
        email: 'leanne.graham@exp.com',
        phone: '0798865302',
        picture: '/profile_picture.jpg',
        warning: 'true',
        ban: 'false',
    }

    return (
        <>
            <Card className="border rounded m-5 bg-slate-200 shadow-slate-500">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1">
                    <div className="ProfilePicture m-5">
                        <img src={volonteer.picture} alt="profile-picture" className="h-96 w-96 rounded-full object-cover" />
                    </div>
                    <div className="Info-details mt-10 object-center">
                        <Typography className="m-8">
                            {volonteer.firstname} {volonteer.lastname}
                        </Typography>
                        <div className="m-8">
                            {volonteer.email}
                        </div>
                        <div className="m-8">
                            {volonteer.phone}
                        </div>
                        <div className="m-8 flex justify-center">
                            <PopOverRating />
                        </div>
                        <div className="m-8">
                            <div><p className="mt-10">Modifier mon profile:</p></div>
                            <button className=""><MdModeEdit size="30" className="mt-3 " /></button>
                        </div>
                    </div>

                </div>
            </Card>
        </>
    );
}
