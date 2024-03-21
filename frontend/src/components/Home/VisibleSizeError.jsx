import { motion } from "framer-motion";

const VisibleSizeError = ({name, size}) => {
    return ( 
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 w-full"
        >
          <div className="flex justify-center mt-[24px]">
            <div className="py-[8px] max-w-[360px] px-[8px] z-50 rounded-3xl text-white bg-red-600 flex justify-center items-center">
              !!! Файл {name} слишком большой, максимальный размер файлов - {size} мб !!!
            </div>
          </div>
        </motion.div>
     );
}
 
export default VisibleSizeError;