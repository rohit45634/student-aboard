"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
} from "@mui/material";

import { useParams, useRouter } from "next/navigation";

export default function SingleProductPage() {
  const { id } = useParams();

  const router = useRouter();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);

      setProduct(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
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
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Button
        variant="outlined"
        sx={{ mb: 4 }}
        onClick={() => router.push("/products")}
      >
        Back to Products
      </Button>

      <Card
        sx={{
          borderRadius: 4,
          boxShadow: 4,
          overflow: "hidden",
        }}
      >
        <Grid container>
          {/* Product Images */}
          <Grid item xs={12} md={6}>
            <Stack spacing={2} p={2}>
              {product?.images?.map((img, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  image={img}
                  alt={product.title}
                  sx={{
                    width: "100%",
                    height: 250,
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
              ))}
            </Stack>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {product?.title}
              </Typography>

              <Typography variant="body1" color="text.secondary" mb={3}>
                {product?.description}
              </Typography>

              <Typography variant="h6" mb={2}>
                <strong>Price:</strong> ${product?.price}
              </Typography>

              <Typography variant="h6" mb={2}>
                <strong>Rating:</strong> {product?.rating}
              </Typography>

              <Typography variant="h6" mb={2}>
                <strong>Category:</strong> {product?.category}
              </Typography>

              <Typography variant="h6">
                <strong>Brand:</strong> {product?.brand}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
