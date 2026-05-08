"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "@/src/store/authStore";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Pagination,
  CircularProgress,
  Container,
} from "@mui/material";

import { useRouter } from "next/navigation";

export default function UsersPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 10;

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const cachedUsers = localStorage.getItem("users");

      if (cachedUsers && !search) {
        setUsers(JSON.parse(cachedUsers));
        setLoading(false);
        return;
      }

      const skip = (page - 1) * limit;

      let url = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

      if (search) {
        url = `https://dummyjson.com/users/search?q=${search}`;
      }

      const res = await axios.get(url);

      setUsers(res.data.users);

      localStorage.setItem("users", JSON.stringify(res.data.users));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography mb={2}>Welcome {user?.username}</Typography>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        sx={{ textAlign: "center" }}
      >
        Users List
      </Typography>

      <Box mb={4}>
        <TextField
          fullWidth
          label="Search Users"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </Box>

      {loading ? (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card
                onClick={() => router.push(`/users/${user.id}`)}
                sx={{
                  borderRadius: 3,
                  height: "100%",
                  boxShadow: 3,
                  cursor: "pointer",
                  transition: "0.3s",

                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    {user.firstName} {user.lastName}
                  </Typography>

                  <Typography mb={1}>
                    <strong>Email:</strong> {user.email}
                  </Typography>

                  <Typography mb={1}>
                    <strong>Gender:</strong> {user.gender}
                  </Typography>

                  <Typography mb={1}>
                    <strong>Phone:</strong> {user.phone}
                  </Typography>

                  <Typography>
                    <strong>Company:</strong> {user.company?.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {!search && (
        <Box mt={5} display="flex" justifyContent="center">
          <Pagination
            count={10}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
}
