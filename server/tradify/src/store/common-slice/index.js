import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

// Fetch feature images
export const getFeatureImages = createAsyncThunk(
  "common/getFeatureImages",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/common/feature/get"
    );
    return response.data;
  }
);

// Add feature image
export const addFeatureImage = createAsyncThunk(
  "common/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      "http://localhost:5000/api/common/feature/add",
      { image }
    );
    return response.data;
  }
);

// Delete feature image
export const deleteFeatureImage = createAsyncThunk(
  "common/deleteFeatureImage",
  async (imageId, { rejectWithValue }) => {
    if (!imageId) return rejectWithValue("Invalid image ID");

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/common/feature/delete/${imageId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete image");
    }
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.featureImageList = state.featureImageList.filter(
          (image) => image.id !== action.meta.arg
        );
      });
  },
});

export default commonSlice.reducer;
