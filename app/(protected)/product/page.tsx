import { auth } from '@/auth'

const Product = async () => {
    const session = await auth()
    console.log(session);

    return (
        <div>
            Product here
        </div>
    )
}

export default Product