import Link from 'next/link'
import { getUser } from "../../services";
import { UserCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/solid'


export default function detailUser(props) {
    const { user } = props;

    return (
        <>
            <div className="flex items-center justify-center flex-col my-4">
                <div className="bg-white p-5 rounded-md sm:w-1/3 w-[400px] shadow-sm space-y-2 flex flex-col items-center justify-center">
                    <div className="bg-[#AEBDCA] w-full flex items-center justify-center py-2 rounded-md">
                        <UserCircleIcon className="h-32 w-32 text-[#516BEB]" />
                    </div>
                    <div className="font-bold text-2xl">{user?.name}</div>
                    <div className="font-sans text-lg">{user?.email}</div>
                    <div className="font-sans text-lg">{user?.gender}</div>
                    <div className="flex items-center justify-between w-full">
                        <Link href={`/users`}>
                            <button className="bg-[#516BEB] py-2 px-4 rounded-sm font-bold text-white flex items-center justify-center gap-2"><ArrowLeftIcon className="w-4 h-4" /> Back</button>
                        </Link>
                        {user?.status === "active" ? (
                            <div className="flex items-center justify-center border-2 border-gray-400 py-2 px-4 rounded-md gap-2">
                                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                                <div className="font-mono font-bold text-gray-500">Active</div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center border-2 border-gray-400 py-2 px-4 rounded-md gap-2">
                                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                                <div className="font-mono font-bold text-gray-500">Inactive</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const req = await getUser(context.params.id);
    const res = req.data;

    return {
        props: {
            user: res
        }
    }
}
