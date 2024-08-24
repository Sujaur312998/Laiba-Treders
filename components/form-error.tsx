import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

interface message {
    message: String
}

const FormError = ({
    message
}: message) => {
    if (!message) return null
    return (
        <div className="bg-destructive/15 flex items-center justify-center rounded-md gap-2 text-sm text-destructive p-2">
            <ExclamationTriangleIcon />
            <p>{message}</p>
        </div>
    )
}

export default FormError