const InvoiceHeader = () => {
    let today: any = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    return (
        <div>
            <header className="flex justify-between items-center mb-8">
                <div className="w-[75%]">
                    <h1 className="text-3xl font-bold mb-2 text-rose-800">M/S Laiba Treders</h1>
                    <h2 className="text-5xl font-bold text-gray-800">INVOICE</h2>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-600">BILLED TO</p>
                    <p className="text-lg font-semibold"> John Smith</p>
                    <p className='text-gray-400'> 1123 Loremipsumdolorsitamet</p>
                </div>
            </header>
            <header className="mb-6">
                <div className="flex justify-between text-sm text-gray-700">
                    <div>
                        <span className="font-semibold">A/C: </span>
                        <span className="text-sm font-light text-gray-400">*************-bb32-ebe9d8aa71ba</span>
                    </div>
                    <div className="text-right flex">
                        <p className="font-semibold">Date:</p>
                        <p>{today}</p>
                    </div>
                </div>
            </header>

        </div>
    )
}
export default InvoiceHeader