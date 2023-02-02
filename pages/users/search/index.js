import { UserCircleIcon, EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export default function Search(props) {

    const { searchResult } = props;

    return (
        <>
            {searchResult && searchResult.map((result) => (
                <div key={result?.id} className="flex items-center justify-between py-2 px-5 bg-white shadow-sm w-full rounded-sm">
                    <div className="flex items-center justify-center gap-2">
                        <UserCircleIcon className="h-8 w-8 text-[#516BEB]" />
                        <div className="font-medium">{result?.name}</div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <Link href={`/users/${result?.id}`}>
                            <button className="bg-[#EAE509] hover:bg-[#cdcb3a] p-2 rounded-md"><EyeIcon className="h-4 w-4 text-black" /></button>
                        </Link>
                        <button className="bg-[#42C2FF] hover:bg-[#349ac9] p-2 rounded-md"><PencilSquareIcon className="h-4 w-4 text-black" /></button>
                        <button className="bg-[#B73E3E] hover:bg-[#8d3131] p-2 rounded-md"><TrashIcon className="h-4 w-4 text-white" /></button>
                    </div>
                </div>
            ))}
        </>
    )
}