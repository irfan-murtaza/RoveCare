import { storage } from "./Components/firebase";
import { useState } from "react";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [imageId, setImageId] = useState("mabdu@gmail.com");
  const [url, setUrl] = useState("");
  const storage = getStorage();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const imageRef = ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image).then(() => {
      console.log("Image Uploaded");
    });
    getDownloadURL(imageRef).then((url) => {
      setUrl(url);
    });
  };

  return (
    <div>
      Please Upload Image
      <input type="file" onChange={handleChange}></input>
      <button onClick={handleUpload}> Upload</button>
      <br />
      {url}
      <br />
      <img src={url || "http://via.placeholder.com/300"} alt="firebase-image" />
    </div>
  );
};
export default UploadImage;
