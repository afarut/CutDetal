import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { convertBase64 } from "../../utils/convertBase64";
import axios from "../../axios.js";
import LoadingFiles from "./loadingFiles.jsx";
import Calculate from "./calculate.jsx";
import PlacingOrder from "./placingOrder.jsx";
import VisibleError from "./visibleError.jsx";
import FormUpload from "./formupload.jsx";
import LandingPage from "./landingpage.jsx";
import ErrorPopup from "./errorPopup.jsx";
import VisibleSizeError from "./VisibleSizeError.jsx";
import FormLoading from "./formloading.jsx";
import { useLocation } from "react-router-dom";


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
  const [materials, setMaterials] = useState([]);
  const [quantityValues, setQuantityValues] = useState([]);
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [detailsIds, setDetailsIds] = useState([]);
  const [items, setItems] = useState([]);
  const [maxFileSize, setMaxFileSize] = useState(1000);
  const [comment, setComment] = useState('');
  const [errorServer, setErrorServer] = useState(false)
  const [errorSize, setErrorSize] = useState(false)
  const [fileName, setFileName] = useState('')
  const [idConfirm, setIdConfirm] = useState(null)

  const location = useLocation()
  const {pathname} = location

  const searchParams = new URLSearchParams(location.search);
  const ids = searchParams.getAll('ids');

  // console.log(ids)

  // if (ids.length !== 0) {
  //   setUploading(true);
  // }
  
  // if (materials.length !== 0 && ids.length !== 0) {
  //   console.log(materials)
  //   getDetailsInfo()
  // }

  async function getDetailsInfo() {
    if (materials.length !== 0 && ids.length !== 0) {
      try {     
        const response = await axios.get("/dxf/get/", {params: {ids: ids}})
        console.log(response.data)
        setData(response.data);
        console.log(response.data)

        let newQuantityValues = []
        response.data.map((el) => {
          newQuantityValues[el.id] = 1
        })
        setQuantityValues(newQuantityValues)

        let newMaterialValues = []
        response.data.map((el) => {
          newMaterialValues[el.id] = materials[0].id
        })
        setMaterialValues(newMaterialValues)

        // setQuantityValues((prevData) => {
        //   const newData = [...prevData];
        //   newData[response.data.id] = 1; 
        //   return newData;
        // });
        // setMaterialValues((prevData) => {
        //   const newData = [...prevData];
        //   newData[response.data.id] = materials[0].id;
        //   return newData;
        // });
      } catch (error) {
        console.error(error.message);
      }
      goCalc()
    }
  }

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

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const handleTypeChange = (event) => {
    setIsIndividual(event.target.id === "Физическое лицо");
  };

  const sendDataToServer = () => {

    try {
      setFormLoading(true);
      let detailsDataUpdate = [];
      for (let index = 0; index < data.length; index++) {
        const item = {
          detail_id: data[index].id,
          material_id: materialValues[data[index].id],
          count: quantityValues[data[index].id],
          price: items[data[index].id],
        };
        detailsDataUpdate.push(item);
      }
      const dataUpdate = {
        username: name,
        email: email,
        phone_number: phoneNumber,
        is_individual: isIndividual,
        details: detailsDataUpdate,
        comment: comment
      };

      axios.post("/dxf/confirm/", dataUpdate)
      .then((res) => {
        setIdConfirm(res.data.order_id)
        if (res.data.status !== 'success'){
          setErrorServer(true)
          setFormLoading(false);
        }
        else{
          setFormLoading(false);
          setFormUpload(true);
        }
      })
      .catch(error => {
        setFormLoading(false);
        setErrorServer(true)
        console.error("Error:", error);
      });

    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      setFormLoading(false);
      setErrorServer(true)
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPlacingOrder(false);

    sendDataToServer();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/material/");
        setMaterials(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (ids.length !== 0 && materials.length !== 0 && data.length === 0) {
      setLoading(true)
      getDetailsInfo();
    }
  }, [ids, materials]);

  useEffect(() => {
    axios
      .get("/get/size")
      .then((response) => {
        setMaxFileSize(response.data.size)
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const onDrop = async (acceptedFiles) => {
    setLoading(true);
    let error = false;

    acceptedFiles.forEach((file) => {
      if (file.size > maxFileSize * 1000) {
        setFileName(file.name)
        setErrorSize(true)
        windowClose()
        setTimeout(() => {
          setErrorSize(false)
        }, 3000);
        return
      }
      if (!file.name.toLowerCase().endsWith(".dxf") ) {
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

    acceptedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const convertedFiles = await Promise.all(
        acceptedFiles.map(convertBase64)
      );
      setFiles(convertedFiles);

      for (let i = 0; i < convertedFiles.length; i++) {
        await axios
          .post("/dxf/", {
            base64file: convertedFiles[i].replace(
              "data:application/octet-stream;base64,",
              ""
            ),
            namefile: acceptedFiles[i].name,
          })
          .then((response) => {
            setData((prevData) => [...prevData, response.data]);
            console.log(response.data)
            setQuantityValues((prevData) => {
              const newData = [...prevData];
              newData[response.data.id] = 1; 
              return newData;
            });
            setMaterialValues((prevData) => {
              const newData = [...prevData];
              newData[response.data.id] = materials[0].id;
              return newData;
            });
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
    accept: {
      'image/vnd': [".dxf", ".DXF"]
    },
    multiple: true,
  });

  const windowClose = (event) => {
    if (event) {
      event.preventDefault();
    }
    setMaterialValues([]);
    setMaterials([])
    setQuantityValues([]) 
    setData([]) 
    setOrders([]) 
    setDetailsIds([]) 
    setDetailsIds([]) 
    setItems([]) 
    setFiles([])
    setLoading(false);
    setUploading(false);
    setFiles([]);
    setFormUpload(false);
    setCalculate(false);
    setData([]);
    setErrorServer(false)
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

  const handleItemRemove = (id) => {
    const newData = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].id !== id) {
        newData.push(data[i]);
      }
    }
    setData(newData);

    const newMaterialValues = [...materialValues];

    const newQuantityValues = [...quantityValues];
    newMaterialValues[id] = null;
    newQuantityValues[id] = null;

    setMaterialValues(newMaterialValues);
    setQuantityValues(newQuantityValues);

    if (newData.length === 0) {
      windowClose();
    }
  };

  return (
    <div className="">
      {errorSize && <VisibleSizeError name={fileName} size={maxFileSize} />}
      {visibleError ? <VisibleError /> : ""}
      {loading ? (
        <LoadingFiles
          uploading={uploading}
          goCalc={goCalc}
          windowClose={windowClose}
        />
      ) : (
        ""
      )}
      {formLoading ? <FormLoading /> : ""}
      {formUpload ? <FormUpload windowClose={windowClose} /> : ""}
      {calculate && data.length>0 ? (
        <Calculate
          setDetailsIds={setDetailsIds}
          detailsIds={detailsIds}
          goPlacingOrder={goPlacingOrder}
          windowClose={windowClose}
          data={data}
          setData={setData}
          materialValues={materialValues}
          handleMaterialChange={handleMaterialChange}
          materials={materials}
          quantityValues={quantityValues}
          handleQuantityChange={handleQuantityChange}
          handleItemRemove={handleItemRemove}
          setOrders={setOrders}
          files={files}
          setItems={setItems}
          items={items}
        />
      ) : (
        ""
      )}
      {placingOrder ? (
        <PlacingOrder
          name={name}
          handleNameChange={handleNameChange}
          phoneNumber={phoneNumber}
          handlePhoneNumberChange={handlePhoneNumberChange}
          email={email}
          handleEmailChange={handleEmailChange}
          isIndividual={isIndividual}
          handleTypeChange={handleTypeChange}
          goPrevPlacingOrder={goPrevPlacingOrder}
          handleSubmit={handleSubmit}
          comment={comment}
          handleCommentChange ={handleCommentChange}
        />
      ) : (
        ""
      )}
      {errorServer ? (
        <ErrorPopup windowClose={windowClose} idConfirm={idConfirm}/>
      ) : ""}
      <LandingPage getRootProps={getRootProps} getInputProps={getInputProps} />
    </div>
  );
};

export default Home;
