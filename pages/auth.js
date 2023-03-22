import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import { Typography, Paper } from "@mui/material";

// Note that next-firebase-auth inits Firebase for us,
// so we don't need to.

const firebaseAuthConfig = {
  signInFlow: "popup",
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    },
  ],
  signInSuccessUrl: "/",
  credentialHelper: "none",
  callbacks: {
    // https://github.com/firebase/firebaseui-web#signinsuccesswithauthresultauthresult-redirecturl
    signInSuccessWithAuthResult: () =>
      // Don't automatically redirect. We handle redirects using
      // `next-firebase-auth`.
      false,
  },
};

const FirebaseAuth = () => {
  // Do not SSR FirebaseUI, because it is not supported.
  // https://github.com/firebase/firebaseui-web/issues/213
  const [renderAuth, setRenderAuth] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setRenderAuth(true);
    }
  }, []);
  console.log("Rendered auth");
  return (
    <div>
      <Paper
        style={{
          maxWidth: "500px",
          width: "90%",
          height: "auto",
          display: "grid",
          gridRowGap: "20px",
          padding: "90px 10px",
          margin: "40px auto",
        }}
      >
        <Typography
          variant="h3"
          color="#981b07"
          style={{
            margin: "100px auto",
            textAlign: "center",
          }}
        >
          Registrate para continuar
        </Typography>
        <div 
          style={{
            padding: "90px 10px",
          }}
        >
          {renderAuth ? (
            <StyledFirebaseAuth
            uiConfig={firebaseAuthConfig}
            firebaseAuth={firebase.auth()}
            />
            ) : null}
        </div>
      </Paper>
    </div>
  );
};
export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(FirebaseAuth);
