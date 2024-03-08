import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { convertBase64 } from "../../utils/convertBase64";
import axios from '../../axios.js'
import LoadingFiles from "./loadingFiles.jsx";
import Calculate from "./calculate.jsx";
import PlacingOrder from "./placingOrder.jsx";
import VisibleError from "./visibleError.jsx";
import FormUpload from "./formupload.jsx";
import LandingPage from "./landingpage.jsx";

const Home = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
  const [calculate, setCalculate] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isIndividual, setIsIndividual] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [formUpload, setFormUpload] = useState(false);
  const [materialValues, setMaterialValues] = useState([]);
  const [materials, setMaterials] = useState([])
  const [quantityValues, setQuantityValues] = useState([]);
  const [data, setData] = useState([])
  const [orders, setOrders] = useState([])    

  console.log(quantityValues)

  const handleMaterialChange = (index, value) => {
    const newMaterialValues = [...materialValues];
    newMaterialValues[index] = value;
    setMaterialValues(newMaterialValues);
  };


  const handleQuantityChange = (index, value) => {
    const newQuantityValues = [...quantityValues];
    newQuantityValues[index] = value;
    setQuantityValues(newQuantityValues);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleTypeChange = (event) => {
    setIsIndividual(event.target.id === "Физическое лицо");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPlacingOrder(false);
    setFormLoading(true);
    ///тут запрос к бд
    //если вернуло статус ок, то
    setFormLoading(false);
    setFormUpload(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/material/');
        setMaterials(response.data)
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, []);

  const onDrop = async (acceptedFiles) => {
    setLoading(true);
    let error = false;

    acceptedFiles.forEach((file) => {
      if (!file.name.toLowerCase().endsWith(".dxf")) {
        error = true;
        setVisibleError(true);

        setTimeout(() => {
          setVisibleError(false);
        }, 3000);

        return;
      }
    });

    if (error) {
      setLoading(false);
      setUploading(false);
      setFiles([]);
      return;
    }

    const formData = new FormData();

    acceptedFiles.forEach(file => {
      formData.append('files', file);
    });

    try {
      const convertedFiles = await Promise.all(
        acceptedFiles.map(convertBase64)
      );
      setFiles(convertedFiles);

      for (let i = 0; i < convertedFiles.length; i++) {
        console.log(acceptedFiles[i].name)
        await axios
          .post(
            "/dxf/",
            { base64file: convertedFiles[i].replace("data:application/octet-stream;base64,", ''), namefile: acceptedFiles[i].name },
          )
          .then((response) => {
            setData(prevData => [...prevData, response.data]);
            setQuantityValues(prevData => [...prevData, 1])
            setMaterialValues(prevData => [...prevData, materials[0].id])
          })
          .catch((error) => {
            console.error(error.message);
          });
      }
      setUploading(true);
    } catch (error) {
      console.error("Error converting files to Base64:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: [".dxf", ".DXF"],
    multiple: true,
  });

  const windowClose = (event) => {
    if (event) {
      event.preventDefault();
    }
    setLoading(false);
    setUploading(false);
    setFiles([]);
    setFormUpload(false);
    setCalculate(false);
    setData([])
  };

  const goCalc = () => {
    setUploading(false);
    setCalculate(true);
    setLoading(false);
  };

  const goPlacingOrder = () => {
    setCalculate(false);
    setPlacingOrder(true);
  };

  const goPrevPlacingOrder = () => {
    setPlacingOrder(false);
    setCalculate(true);
  };

  const handleItemRemove = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);

    const newMaterialValues = [...materialValues];
    const newQuantityValues = [...quantityValues];
    newMaterialValues.splice(index, 1);
    newQuantityValues.splice(index, 1);

    setMaterialValues(newMaterialValues);
    setQuantityValues(newQuantityValues);

    if (newData.length === 0) {
        windowClose();
    }
};

  return (
    <div className="">
      {visibleError ? <VisibleError /> : "" }
      {loading ? <LoadingFiles uploading={uploading} goCalc={goCalc} windowClose={windowClose} /> : ""}
      {formLoading ? <formLoading /> : "" }
      {formUpload ? <FormUpload windowClose={windowClose}/> : "" }
      {calculate ? <Calculate 
        goPlacingOrder = {goPlacingOrder}
        windowClose = {windowClose} 
        data = {data}
        setData = {setData}
        materialValues = {materialValues}
        handleMaterialChange = {handleMaterialChange} 
        materials = {materials} 
        quantityValues = {quantityValues} 
        handleQuantityChange = {handleQuantityChange}
        handleItemRemove={handleItemRemove}
        setOrders={setOrders}
        files={files}
        /> : "" }
      {placingOrder ? <PlacingOrder 
        name={name} 
        handleNameChange = {handleNameChange} 
        phoneNumber = {phoneNumber}
        handlePhoneNumberChange = {handlePhoneNumberChange}
        email = {email}
        handleEmailChange = {handleEmailChange}
        isIndividual = {isIndividual}
        handleTypeChange = {handleTypeChange}
        goPrevPlacingOrder = {goPrevPlacingOrder}
        handleSubmit = {handleSubmit}
      /> : "" }
      <LandingPage getRootProps={getRootProps} getInputProps={getInputProps}/>
    </div>
  );
};

export default Home;
