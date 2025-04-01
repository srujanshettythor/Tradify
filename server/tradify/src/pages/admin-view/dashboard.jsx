import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
} from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [validImages, setValidImages] = useState([]); // Stores only valid images
  const dispatch = useDispatch();
  const featureImageList = useSelector(
    (state) => state.commonFeature?.featureImageList || []
  );

  console.log(uploadedImageUrl, "uploadedImageUrl");

  function handleUploadFeatureImage() {
    if (!uploadedImageUrl) return; // Prevent empty uploads
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  function handleDeleteFeatureImage(id) {
    if (!id) return; // Prevent invalid deletions
    dispatch(deleteFeatureImage(id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  // Updates validImages state when featureImageList changes
  useEffect(() => {
    const filteredImages = featureImageList.filter(
      (img) =>
        img.image && // Ensure image exists
        !img.image.includes("bry3zsdb7ncnlkiifvsu") // Filter placeholder images
    );
    setValidImages(filteredImages);
  }, [featureImageList]);

  console.log(validImages, "validImages");

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {validImages.length > 0 ? (
          validImages.map((featureImgItem, index) => (
            <div key={featureImgItem.id || index} className="relative">
              <img
                src={featureImgItem.image}
                className="w-full h-[300px] object-cover rounded-t-lg"
                alt="Uploaded"
                onError={(e) => {
                  // Remove the broken image from the validImages state
                  setValidImages((prev) =>
                    prev.filter((img) => img.image !== featureImgItem.image)
                  );
                }}
              />
              <Button
                onClick={() => handleDeleteFeatureImage(featureImgItem.id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-md"
              >
                Delete
              </Button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
