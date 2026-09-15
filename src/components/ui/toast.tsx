import { BiCheckCircle } from "react-icons/bi"
import { FiAlertCircle, FiInfo } from "react-icons/fi"
import { toast } from "sonner"


export const successToast = (title = "Success", message = "Enjoy your stay!") => {
    toast.success(
        <div className="flex flex-col gap-1">
            <span className="font-semibold text-white">{title}</span>
            <span className="text-[#797777] text-xs">{message}</span>
        </div>,
        { icon: <BiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0" /> }
    )
}
export const errorToast = (title = "Error", message = "An error occurred. Please try again.") => {
    toast.error(
        <div className="flex flex-col gap-1">
            <span className="font-semibold text-white">{title}</span>
            <span className="text-[#b1abab] text-xs">{message}</span>
        </div>,
        { icon: <FiAlertCircle className="w-5 h-5 text-rose-600 shrink-0" /> }
    )
}
export const infoToast = (title = "Info", message = "Here is some information for you.") => {
    toast.info(
        <div className="flex flex-col gap-1">
            <span className="font-semibold text-white">{title}</span>
            <span className="text-[#b1abab] text-xs">{message}</span>
        </div>,
        { icon: <FiInfo className="w-5 h-5 text-blue-600 shrink-0" /> }
    )
}