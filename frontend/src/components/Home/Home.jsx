import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import module from "./home.module.css";
import modal from "../../images/modal.png";
import upload from "../../images/upload_icon.png";
import docIcon from "../../images/doc icon.png";
import fileIcon from "../../images/document-file-sharing.png";
import setting from "../../images/settings icon.png";
import okey from "../../images/okeydownload.svg"
import krest from "../../images/krestik.svg"
import {convertBase64} from "../../utils/convertBase64"
import { motion } from "framer-motion";

const Home = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false)

    const [visibleError, setVisibleError] = useState(false);

    const onDrop = async (acceptedFiles) => {
        setLoading(true);
        let error = false;
    
        acceptedFiles.forEach(file => {
            if (!file.name.endsWith('.dxf')) {
                error = true;
                setVisibleError(true);

                setTimeout(() => {
                    setVisibleError(false);
                }, 3000);

                return;
            }
        });
    
        if (error){
            setLoading(false);
            setUploading(false);
            setFiles([]);
            return;
        }
    
        try {
            const convertedFiles = await Promise.all(acceptedFiles.map(convertBase64));
            setFiles(convertedFiles);
            setUploading(true);
        } catch (error) {
            console.error('Error converting files to Base64:', error);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: '.dxf',
        multiple: true
    });

    const windowClose = (event) => {
        event.preventDefault()
        setLoading(false)
        setUploading(false)
        setFiles([])
    }


    return (
        <div className=''>
            {visibleError ? 
                 <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className='absolute top-0 w-full'
                    >
                    <div className='flex justify-center mt-[24px]'>
                        <div className='py-[8px] w-[300px] z-50 rounded-3xl text-white bg-red-600 flex justify-center items-center' >
                            !!! Загрузите только .dxf файлы !!!
                        </div>
                    </div>
                </motion.div>
            : ""}
            {loading && (
                <div className='absolute inset-0 flex justify-center pt-[10%] bg-opacity-60 bg-black z-20 h-full'>
                    <div className='h-[472px] w-[472px] bg-white rounded-3xl '>
                        <div className=' h-full relative'>
                            {uploading === true ? (
                                <div className='flex flex-col items-center gap-[26px] justify-center h-full'>
                                    <div>
                                        <img src={okey} alt="okey" />
                                    </div>
                                    <div className={module.processWindowText}>
                                        Files are ready!
                                    </div>
                                    <div className={module.buttonOkey}>
                                        К расчету
                                    </div>
                                </div>
                            ) : (
                                <div className='flex flex-col items-center gap-[48px] justify-center h-full'>
                                    <div className={module.processWindow}></div>
                                    <div className={module.processWindowText}>
                                        Files in process...
                                    </div>
                                </div>
                            )}
                            <div className={`${module.rotatedImage} absolute right-0 top-0 m-[16px] cursor-pointer`} onClick={windowClose}>
                                <img src={krest} alt="okey" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="homepage">
                <div className={`relative ${module.contentWrapper}`}>
                    <div className={`flex h-auto gap-[16px] ${module.mainLabel}`}>
                        <div className={`${module.leftpanelLabel} flex justify-between items-center pl-[42px]`}>
                            <div className={`flex flex-col ${module.title}`}>
                                <span>Быстрый расчет</span>
                                <span>стоимости деталей по чертежам DXF</span>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <div
                                className={`min-w-[570px] max-w-[625px] h-full p-[42px] relative ${module.pcInputLabel}`}
                                style={{
                                    backgroundImage: `url(${modal})`,
                                    backgroundSize: 'cover',
                                }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <div className="rounded-3xl bg-white w-full h-full p-[24px] flex flex-col gap-[24px] justify-between">
                                    <div className={`cursor-pointer ${module.windowfile}`}>
                                        <div className="flex justify-center items-center h-full w-full">
                                            <div className="flex flex-col gap-[56px]">
                                                <div className="flex justify-center items-center"><img src={upload} alt="upload" /></div>
                                                <div className={module.underuploadicon}>Или перетащите сюда ваши DXF файлы</div>
                                            </div>
                                        </div>
                                    </div>
                                    <label htmlFor="file_DXF" className={module.buttoninputfile}>Загрузить сейчас</label>
                                </div>
                            </div>
                            <div className={module.buttonMobileDiv}>
                                <label htmlFor="file_DXF" className={module.buttoninputfileMobile}>Загрузить сейчас</label>
                            </div>
                        </div>
                    </div>
                    <div className={`mt-[75px] mb-[75px] px-[5vw] lg:px-[125px] md:px-[5%] py-[75px] flex flex-col md:flex-row gap-[5vw] ${module.rowLables}`}>
                        <div className="rounded-3xl flex flex-col gap-[12px] bg-white px-[42px] py-[31px]">
                            <div className="flex flex-col gap-[12px] items-center"><img src={fileIcon} className="h-[84px] w-[108px]" alt="docIcon" /><div className={module.iconlabel}>Загрузите <br /> файлы DXF</div></div>
                            <div className={module.textlabelsblock}>Загрузить один или несколько DXF файлов для обработки</div>
                        </div>
                        <div className="rounded-3xl flex flex-col gap-[12px] bg-white px-[42px] py-[31px]">
                            <div className="flex flex-col gap-[12px] items-center"><img src={setting} className="h-[84px] w-[84px]" alt="docIcon" /><div className={module.iconlabel}>Загрузите <br /> файлы DXF</div></div>
                            <div className={module.textlabelsblock}>Загрузить один или несколько DXF файлов для обработки</div>
                        </div>
                        <div className="rounded-3xl flex flex-col gap-[12px] bg-white px-[42px] py-[31px]">
                            <div className="flex flex-col gap-[12px] items-center"><img src={docIcon} className="h-[84px] w-[75px] " alt="docIcon" /><div className={module.iconlabel}>Загрузите <br /> файлы DXF</div></div>
                            <div className={module.textlabelsblock}>Загрузить один или несколько DXF файлов для обработки</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
