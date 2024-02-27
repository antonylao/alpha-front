import React from "react";
import ReactDOM from "react-dom";
import * as Components from "../../Components/SignInUp/SignInUp";


export default function VolonteerSignIn() {
    const [signIn, toggle] = React.useState(true);
    return (
        <div className="flex justify-center m-8">
            <Components.Container>
                <Components.SignUpContainer signingIn={signIn}>
                <Components.Form>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type="text" placeholder="Name" autoComplete="on" />
                    <Components.Input type="email" placeholder="Email" autoComplete="on" />
                    <Components.Input type="password" placeholder="Password" autoComplete="off" />
                    <Components.Button>Sign Up</Components.Button>
                </Components.Form>
                </Components.SignUpContainer>
                <Components.SignInContainer signingIn={signIn}>
                <Components.Form>
                    <Components.Title>Sign in</Components.Title>
                    <Components.Input type="email" placeholder="Email" autoComplete="on" />
                    <Components.Input type="password" placeholder="Password" autoComplete="off" />
                    <Components.Anchor href="#">Forgot your password?</Components.Anchor>
                    <Components.Button>Sign In</Components.Button>
                </Components.Form>
                </Components.SignInContainer>
                <Components.OverlayContainer signingIn={signIn}>
                <Components.Overlay signingIn={signIn}>
                    <Components.LeftOverlayPanel signingIn={signIn}>
                    <Components.Title>Welcome Back!</Components.Title>
                    <Components.Paragraph>
                        To keep connected with us please login with your personal info
                    </Components.Paragraph>
                    <Components.GhostButton onClick={() => toggle(true)}>
                        Sign In
                    </Components.GhostButton>
                    </Components.LeftOverlayPanel>
                    <Components.RightOverlayPanel signingIn={signIn}>
                    <Components.Title>Hello, Friend!</Components.Title>
                    <Components.Paragraph>
                        Enter your personal details and start journey with us
                    </Components.Paragraph>
                    <Components.GhostButton onClick={() => toggle(false)}>
                        Sign Up
                    </Components.GhostButton>
                    </Components.RightOverlayPanel>
                </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
      </div>
    );
}
