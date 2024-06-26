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
import ServerFilesError from "./serverfileserror.jsx";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import module from "./home.module.css"


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
  const [serverErrorFiles, setServerErrorFiles] = useState(false)
  const [daval, setDaval] = useState([])
  const [ids, setIds] = useState([])



  const [selectedThickness, setSelectedThickness] = useState([]);

  const [thicknessOptions, setThicknessOptions] = useState([]);
  const [typeRez, setTypeRez] = useState([])

  const location = useLocation()
  const { pathname } = location

  const searchParams = new URLSearchParams(location.search);

  async function getDetailsInfo() {
    if (materials.length !== 0 && ids.length !== 0 && data.length === 0) {
      try {
        const response = await axios.get("/dxf/get/", { params: { ids: ids } })

        setData(response.data);

        let newQuantityValues = []
        response.data.map((el) => {
          newQuantityValues[el?.id] = 1
        })
        setQuantityValues(newQuantityValues)

      } catch (error) {
        console.error(error.message);
      }
      goCalc()
    }
  }



  const handleThicknessChange = (index, value) => {
    const newThicknessValues = [...selectedThickness];
    newThicknessValues[index] = value;
    setSelectedThickness(newThicknessValues);
  };

  const handleMaterialChange = (index, value) => {

    const element = materials.find(item => parseInt(item.id) === parseInt(value));
    const filteredArr = materials.filter(item => parseInt(item.id) !== parseInt(value));
    setMaterials([element, ...filteredArr]);

    const newMaterialValues = [...materialValues];
    newMaterialValues[index] = value;
    setMaterialValues(newMaterialValues);
    const materialGroup = materials.find(group => group.id === parseInt(value));
    const newThicknessOptions = [...thicknessOptions]
    newThicknessOptions[index] = materialGroup.materials
    setThicknessOptions(newThicknessOptions);
    const newTypeRez = [...typeRez]
    newTypeRez[index] = materialGroup;
    setTypeRez(newTypeRez)
  };

  const handleQuantityChange = (index, value) => {
    const newQuantityValues = [...quantityValues];
    newQuantityValues[index] = Math.max(1, value);
    setQuantityValues(newQuantityValues);
  };

  const handleDavalChange = (index) => {
    const newDaval = [...daval];
    newDaval[index] = newDaval[index]===undefined ? true : !newDaval[index];
    console.log("newDaval", newDaval)
    setDaval(newDaval);
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

  function pingServer() {
    return axios.get("/ping")
      .then((res) => {
        if (!res.data.status) {
          setServerErrorFiles(true);
          windowClose();
          setTimeout(() => {
            setServerErrorFiles(false);
          }, 3000);
          return false;
        } else {
          return true;
        }
      })
      .catch(error => {
        console.error("Error:", error);
        return false;
      });
  }

  const sendDataToServer = () => {
    try {
      setFormLoading(true);
      let detailsDataUpdate = [];
      for (let index = 0; index < data.length; index++) {
        const item = {
          detail_id: data[index].id,
          material_id: parseInt(selectedThickness[data[index].id]),
          count: quantityValues[data[index].id],
          price: items[data[index].id],
          daval: daval[data[index].id]===undefined ? false : daval[data[index].id]
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

      console.log(dataUpdate)


      axios.post("/dxf/confirm/", dataUpdate)
        .then((res) => {
          setIdConfirm(res.data.order_id)
          if (res.data.status !== 'success') {
            setErrorServer(true)
            setFormLoading(false);
          }
          else {
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
    setIds(searchParams.getAll('ids'))

    const fetchData = async () => {
      try {
        const response = await axios.get("/material_group/");
        setMaterials(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (ids.length !== 0 && materials.length !== 0 && data.length === 0) {
      setLoading(true);
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
    let server = await pingServer()

    if (!server) {
      return
    }

    if (acceptedFiles.length === 0) {
      error = true;
      setVisibleError(true);
      setTimeout(() => {
        setVisibleError(false);
      }, 3000);
      windowClose();
      return;
    }

    acceptedFiles.forEach((file) => {
      if (file.size > maxFileSize * 1000) {
        setFileName(file.name);
        setErrorSize(true);
        windowClose();
        setTimeout(() => {
          setErrorSize(false);
        }, 3000);
        return;
      }
      if (!file.name.toLowerCase().endsWith(".dxf")) {
        error = true;
        setVisibleError(true);
        windowClose();
        setTimeout(() => {
          setVisibleError(false);
        }, 3000);
      }
    });

    if (error) {
      setLoading(false);
      setUploading(false);
      setFiles([]);
      return;
    }

    // setServerErrorFiles(true);
    //         setLoading(false)
    //         setTimeout(() => {
    //           setServerErrorFiles(false);
    //         }, 3000);

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
        await Promise.race([
          axios.post("/dxf/", {
            base64file: convertedFiles[i].replace(
              "data:application/octet-stream;base64,",
              ""
            ),
            namefile: acceptedFiles[i].name,
          }),
        ])
          .then((response) => {
            setData((prevData) => [...prevData, response.data]);
            setQuantityValues((prevData) => {
              const newData = [...prevData];
              newData[response.data.id] = 1;
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
    setQuantityValues([]);
    setData([]);
    setOrders([]);
    setDetailsIds([]);
    setItems([]);
    setFiles([]);
    setLoading(false);
    setUploading(false);
    setFormUpload(false);
    setCalculate(false);
    setErrorServer(false);
    setIdConfirm(null);
    setIds([])
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

  const toggleBodyScroll = (shouldDisableScroll) => {
    if (shouldDisableScroll) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
    }
  };

  if (files.length>0){
    toggleBodyScroll(true)
  }
  if (files.length===0){
    toggleBodyScroll(false)
  }

  return (
    <div>
      <div className={files.length > 0 || loading ? module.darkenedBackground : ""}>
        <TransitionGroup>
          {serverErrorFiles && (
            <CSSTransition timeout={300} classNames="popup">
              <ServerFilesError />
            </CSSTransition>
          )}
        </TransitionGroup>

        <TransitionGroup>
          {errorSize && (
            <CSSTransition timeout={300} classNames="popup">
              <VisibleSizeError name={fileName} size={maxFileSize} />
            </CSSTransition>
          )}
        </TransitionGroup>

        <TransitionGroup>
          {visibleError && (
            <CSSTransition timeout={300} classNames="popup">
              <VisibleError />
            </CSSTransition>
          )}
        </TransitionGroup>

        <TransitionGroup>
          {loading && (
            <CSSTransition timeout={300} classNames="popup">
              <LoadingFiles
                uploading={uploading}
                goCalc={goCalc}
                windowClose={windowClose}
              />
            </CSSTransition>
          )}
        </TransitionGroup>

        <TransitionGroup>
          {formLoading && (
            <CSSTransition timeout={300} classNames="popup">
              <FormLoading />
            </CSSTransition>
          )}
        </TransitionGroup>

        <TransitionGroup>
          {formUpload && (
            <CSSTransition timeout={300} classNames="popup">
              <FormUpload windowClose={windowClose} />
            </CSSTransition>
          )}
        </TransitionGroup>

        <TransitionGroup>
          {calculate && data.length > 0 && (
            <CSSTransition timeout={300} classNames="popup">
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
                handleThicknessChange={handleThicknessChange}
                thicknessOptions={thicknessOptions}
                selectedThickness={selectedThickness}
                typeRez={typeRez}
                daval={daval}
                setDaval={handleDavalChange}
              />
            </CSSTransition>
          )}
        </TransitionGroup>

        <TransitionGroup>
          {placingOrder && (
            <CSSTransition timeout={300} classNames="popup">
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
                handleCommentChange={handleCommentChange}
              />
            </CSSTransition>
          )}
        </TransitionGroup>

        <TransitionGroup>
          {errorServer && (
            <CSSTransition timeout={300} classNames="popup">
              <ErrorPopup windowClose={windowClose} idConfirm={idConfirm} />
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>


        <LandingPage getRootProps={getRootProps} getInputProps={getInputProps} />
    </div>
  );
};

export default Home;
