"use client";

import { useEffect, useState } from "react";
import useAuthStore from "@/src/store/authStore";

import axios from "axios";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  TextField,
  Pagination,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [page, setPage] = useState(1);

  const limit = 10;

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products/categories");

      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const skip = (page - 1) * limit;

      let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

      if (search) {
        url = `https://dummyjson.com/products/search?q=${search}`;
      }

      if (category) {
        url = `https://dummyjson.com/products/category/${category}`;
      }

      const res = await axios.get(url);

      setProducts(res.data.products);

      // caching improves performance
      // and avoids repeated API calls
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search, category]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography mb={2}>Welcome {user?.username}</Typography>

      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ textAlign: "center" }}
        mb={4}
      >
        Products List
      </Typography>

      {/* Search + Filter */}
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search Products"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>

            <Select
              value={category}
              label="Category"
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              <MenuItem value="">All</MenuItem>

              {categories.map((cat, index) => (
                <MenuItem key={index} value={cat.slug}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Loader */}
      {loading ? (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                onClick={() => router.push(`/products/${product.id}`)}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: 3,
                  cursor: "pointer",
                  transition: "0.3s",

                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={product.thumbnail}
                  alt={product.title}
                />

                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {product.title}
                  </Typography>

                  <Typography mb={1}>
                    <strong>Price:</strong> ${product.price}
                  </Typography>

                  <Typography mb={1}>
                    <strong>Category:</strong> {product.category}
                  </Typography>

                  <Typography>
                    <strong>Rating:</strong> {product.rating}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {!search && !category && (
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
