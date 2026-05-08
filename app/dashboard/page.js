"use client";

import { signOut } from "next-auth/react";
import { Box, Button, Typography, Paper, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, sm: 5 },
          width: "100%",
          maxWidth: 400,
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={4}
          sx={{
            fontSize: {
              xs: "1.8rem",
              sm: "2.2rem",
            },
          }}
        >
          Dashboard
        </Typography>

        <Stack spacing={2}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={() => router.push("/users")}
          >
            Users
          </Button>

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={() => router.push("/products")}
          >
            Products
          </Button>

          <Button
            variant="outlined"
            color="error"
            size="large"
            fullWidth
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
