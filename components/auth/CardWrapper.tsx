import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card"
import { Social } from '@/components/auth/Social';
import { BackButton } from './back-button'
interface State {
    children: React.ReactNode,
    headerDescription: String,
    headerTitle: String,
    backButtonHref: any,
    backButtonLevel: any,
    showSocial?: boolean
}

const CardWrapper = ({
    children,
    headerDescription,
    headerTitle,
    backButtonHref,
    backButtonLevel,
    showSocial
}: State) => {
    return (
        <Card className='select-none'>
            <CardHeader className='flex justify-center items-center'>
                <CardTitle className='text-rose-900 text-4xl md:text-6xl font-extrabold '
                >
                    {headerTitle}
                </CardTitle>
                <CardDescription >
                    {headerDescription}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {children}

            </CardContent>
            {
                showSocial && (
                    <CardFooter>
                        <Social />
                    </CardFooter>
                )
            }
            <CardFooter>
                <BackButton label={backButtonLevel} href={backButtonHref} />
            </CardFooter>
        </Card>


    )
}

export default CardWrapper