import { toast } from "react-toastify";

const HandleSuccess = (msg) => {
    toast.success(msg, {
        position: "top-right",
        autoClose: 3000, 
    });
};

const HandleError = (msg) => {
    toast.error(msg, {
        position: "top-right",
        autoClose: 3000, 
    });
};


export { HandleSuccess, HandleError };