import { CheckCircledIcon } from "@radix-ui/react-icons"


interface message {
    message: String
}

const FormSuccess = ({
    message
}: message) => {
    if (!message) return null
    return (
        <div className="bg-emerald-500/15 flex items-center justify-center rounded-md gap-2 text-sm text-emerald-500bg-emerald-500 p-2">
            <CheckCircledIcon />
            <p>{message}</p>
        </div>
    )
}

export default FormSuccess