import React from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { SignInVolunteerOnlyPage } from "../../Components/SignInUp/SignInOnlyPage";
import { SignUpVolunteerOnlyPage } from "../../Components/SignInUp/SignUpOnlyPage";

export function SignInSignUpPage() {
    const [activeTab, setActiveTab] = React.useState("Sign In");
    const data = [
        {
            label: "Sign In",
            value: "Sign In",
            desc: <SignInVolunteerOnlyPage />,
        },
        {
            label: "Sign Up",
            value: "Sign Up",
            desc: <SignUpVolunteerOnlyPage />,
        }
    ];
    return (
        <Tabs value={activeTab}>
            <TabsHeader
                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                indicatorProps={{
                    className:
                        "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                }}
            >
                {data.map(({ label, value }) => (
                    <Tab
                        key={value}
                        value={value}
                        data-cy={value}
                        onClick={() => setActiveTab(value)}
                        className={activeTab === value ? "text-gray-900" : ""}
                    >
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody>
                {data.map(({ value, desc }) => (
                    <TabPanel key={value} value={value}>
                        {desc}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}