import { Button, Paper, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <div>
      <Paper>
        <Typography
          variant="h1"
          color="textSecondary"
          style={{
            margin: "10px auto",
          }}
        >
          Formulario biopolímeros
        </Typography>
        <Button variant="contained">
          <Link href="/auth">Entrar</Link>
        </Button>
      </Paper>
    </div>
  );
};

export default index;
