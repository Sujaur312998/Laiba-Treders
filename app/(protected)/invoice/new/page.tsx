import NewMemo from "@/components/protectedAuth/invoice/NewInvoice"
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Invoice"
};
const NewCashMemo = () => {
    return (
        <div>
            <NewMemo />
        </div>
    )
}

export default NewCashMemo