import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { convertBase64 } from "../../utils/convertBase64";
import axios from "../../axios.js";
import LoadingFiles from "./loadingFiles.jsx";
import VisibleError from "./visibleError.jsx";
import FormUpload from "./formupload.jsx";
import EmbedCalcView from "./EmbedCalcView.jsx";
import ErrorPopup from "./errorPopup.jsx";
import VisibleSizeError from "./VisibleSizeError.jsx";
import FormLoading from "./formloading.jsx";

const EmbedCalcFunc = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
  const [calculate, setCalculate] = useState(false);
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
  const [errorServer, setErrorServer] = useState(false);
  const [errorSize, setErrorSize] = useState(false);
  const [fileName, setFileName] = useState("");
  const [idConfirm, setIdConfirm] = useState(null);

  const [ids, setIds] = useState([])

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
    axios
      .get("/get/size")
      .then((response) => {
        setMaxFileSize(response.data.size);
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
      "image/vnd": [".dxf", ".DXF"],
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
    setDetailsIds([]);
    setItems([]);
    setFiles([]);
    setLoading(false);
    setUploading(false);
    setFiles([]);
    setFormUpload(false);
    setCalculate(false);
    setData([]);
    setErrorServer(false);
  };

  const goCalc = () => {
    setUploading(false);
    setCalculate(true);
    setLoading(false);
  };

  useEffect(() => {
    let tmp = [];

    data.map((el) => {
      tmp.push(el.id);
    });

    setIds(tmp)
  }, [data]);
  console.log(ids)
  return (
    <div className="embedCalcFunc">
      {errorSize && <VisibleSizeError name={fileName} size={maxFileSize} />}
      {visibleError ? <VisibleError /> : ""}
      {loading ? (
        <LoadingFiles
          ids={ids}
          uploading={uploading}
          goCalc={goCalc}
          windowClose={windowClose}
        />
      ) : (
        ""
      )}
      {formLoading ? <FormLoading /> : ""}
      {formUpload ? <FormUpload windowClose={windowClose} /> : ""}
      {errorServer ? (
        <ErrorPopup windowClose={windowClose} idConfirm={idConfirm} />
      ) : (
        ""
      )}
      <EmbedCalcView
        getRootProps={getRootProps}
        getInputProps={getInputProps}
      />
    </div>
  );
};

export default EmbedCalcFunc;
