import { motion } from "framer-motion";

const ServerFilesError = () => {
    return ( 
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 w-full"
        >
          <div className="flex justify-center mt-[24px]">
            <div className="py-[8px] w-[380px] z-50 rounded-3xl text-white bg-red-600 flex justify-center items-center">
              Ошибка подключения, повторите позднее
            </div>
          </div>
        </motion.div>
     );
}
 
export default ServerFilesError;