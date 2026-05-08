"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  CircularProgress,
  Container,
  Grid,
} from "@mui/material";

import { useParams, useRouter } from "next/navigation";

export default function SingleUserPage() {
  const { id } = useParams();

  const router = useRouter();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/users/${id}`);

      setUser(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Button
        variant="outlined"
        sx={{ mb: 3 }}
        onClick={() => router.push("/users")}
      >
        Back to Users
      </Button>

      <Card
        sx={{
          borderRadius: 4,
          boxShadow: 4,
          p: 2,
        }}
      >
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
            <Avatar
              src={user?.image}
              sx={{
                width: 120,
                height: 120,
                mb: 2,
              }}
            />

            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ textAlign: "center" }}
            >
              {user?.firstName} {user?.lastName}
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Email:</strong> {user?.email}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Phone:</strong> {user?.phone}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Gender:</strong> {user?.gender}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Age:</strong> {user?.age}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Username:</strong> {user?.username}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Birth Date:</strong> {user?.birthDate}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography>
                <strong>Address:</strong> {user?.address?.address},{" "}
                {user?.address?.city}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography>
                <strong>Company:</strong> {user?.company?.name}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
