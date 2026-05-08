"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import useAuthStore from "../../src/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // empty validation
    if (!username || !password) {
      toast.error("Please enter username and password");
      return;
    }

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.ok) {
      setAuth(
        {
          username,
        },
        "dummy-token",
      );
      localStorage.setItem("token", "dummy-token");
      router.replace("/dashboard");
    } else {
      toast.error("Wrong username or password");
    }
  };

  return (
    <>
      <Toaster />

      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 400,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{ textAlign: "center" }}
            fontWeight="bold"
            mb={4}
          >
            Admin Login
          </Typography>

          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <TextField
              label="Username"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" variant="contained" size="large" fullWidth>
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
