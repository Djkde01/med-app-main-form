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
        <button 
          className="my-5 w-auto px-8 h-10 bg-blue-600 text-white rounded-md shadow hover:shadow-lg font-semibold"  variant="contained">
          <Link href="/auth">Entrar</Link>
        </button>
      </Paper>
    </div>
  );
};

export default index;
