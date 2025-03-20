import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";


const AddProductPage = ({ addProductSubmit }) => {
  const [productType, setProductType] = useState("Dining");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("0");

  const [mainImageURL, setMainImageURL] = useState(null);
  const [secondary1ImageURL, setSecondary1ImageURL] = useState(null);
  const [secondary2ImageURL, setSecondary2ImageURL] = useState(null);
  const [secondary3ImageURL, setSecondary3ImageURL] = useState(null);

  const navigate = useNavigate();

  const uploadImage = async (file, setImageSet) => {
    if (!file) {
      console.error("No file selected!");
      return ;
    }
    
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'No error details');
        console.error(`Upload failed with status ${response.status}: ${errorText}`);
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Successfully uploaded the image", data.imageUrl);
      setImageSet(data.imageUrl);
    } catch (error) {
      console.error("Upload failed", error);
    }
  }
  
  const submitForm = (e) => {
    e.preventDefault();
    
    const newProduct = {
      name: productName,
      type: productType,
      description: productDescription,
      price: String(productPrice),
      imageURLs: {
        main: mainImageURL,
        secondary1: secondary1ImageURL,
        secondary2: secondary2ImageURL,
        secondary3: secondary3ImageURL,
      }
    }

    addProductSubmit(newProduct);


    return navigate("/shop", { state: { productAdded: true, productName: productName } });
  }
  
  
  return (
      <section className="bg-yellowish">
        <div className="container py-3">
          <div className="bg-white px-4 py-4 mb-4 shadow-md rounded-md border m-4">
            <form onSubmit={submitForm}>
              <h1 className="text-center font-semibold mb-5">
                Add Product
              </h1>

              <div className="mb-4">
                <label className="d-block text-dark-grey fw-semibold fs-4 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="border rounded w-100 py-2 px-3 mb-2"
                  placeholder="eg. Beautiful soft coach"
                  required
                  value={productName}
                  onChange={(e) => { setProductName(e.target.value) }}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="d-block text-dark-grey fw-semibold fs-4 mb-2"
                >
                  Product Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="border rounded w-100 py-2 px-3"
                  required
                  value={productType}
                  onChange={(e) => { setProductType(e.target.value) }}
                >
                  <option value="Dining">Dining</option>
                  <option value="Living">Living</option>
                  <option value="Bedroom">Bedroom</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="d-block text-dark-grey fw-semibold fs-4 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border rounded w-100 py-2 px-3"
                  rows="4"
                  placeholder="Add any product feature: measures, color, material, etc"
                  value={productDescription}
                  onChange={(e) => { setProductDescription(e.target.value) }}
                ></textarea>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="price"
                  className="d-block text-dark-grey fw-semibold fs-4 mb-2"
                >
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  className="border rounded w-100 py-2 px-3"
                  type="number"
                  required
                  value={productPrice}
                  onChange={(e) => { setProductPrice(e.target.value) }}
                >
                </input>
              </div>
              <div className="mb-5">
                  <label 
                  htmlFor="main_image"
                  className="d-block text-dark-grey fw-semibold fs-4 mb-2"
                  >Main image (seen on the shop page):
                  </label>
                  <input type="file" id="main_image" accept="image/png, image/jpeg" className="form-control mb-4" 
                  onChange={ (e) => { 
                    const file = e.target.files[0];
                    if (file) {
                      uploadImage(file, setMainImageURL);
                    } else {
                      console.error("No file selected");
                    }
                  }
                    } />
                  
                  <label 
                  htmlFor="secondary1_image"
                  className="d-block text-dark-grey fw-semibold fs-4 mb-2"
                  >Secondary image 1:
                  </label>
                  <input type="file" id="secondary1_image" accept="image/png, image/jpeg" className="form-control mb-4" onChange={(e) => { uploadImage(e.target.files[0], setSecondary1ImageURL) }} />

                  <label 
                  htmlFor="secondary2_image"
                  className="d-block text-dark-grey fw-semibold fs-4 mb-2"
                  >Secondary image 2:
                  </label>
                  <input type="file" id="secondary2_image" accept="image/png, image/jpeg" className="form-control mb-4" onChange={(e) => { uploadImage(e.target.files[0], setSecondary2ImageURL) }} />

                  <label 
                  htmlFor="secondary3_image"
                  className="d-block text-dark-grey fw-semibold fs-4 mb-2"
                  >Secondary image 3:
                  </label>
                  <input type="file" id="secondary3_image" accept="image/png, image/jpeg" className="form-control mb-4" onChange={(e) => { uploadImage(e.target.files[0], setSecondary3ImageURL) }} />
              </div>

                <button
                  className="btn btn-lg btn-success text-white fw-semibold py-2 rounded-full w-100"
                  type="submit"
                >
                  Add Product
                </button>
            </form>
          </div>
        </div>
      </section>
  )
}

AddProductPage.propTypes = {
  addProductSubmit: PropTypes.func.isRequired,
}

export default AddProductPage