import { useState } from "react";
import Link from "next/link"
import { useRouter } from "next/router";
import { addUser, getAllUsers, getUser, searchUser, updateUser } from "../../services";
import {
    UserCircleIcon,
    TrashIcon,
    PencilSquareIcon,
    EyeIcon,
    MagnifyingGlassCircleIcon,
    XMarkIcon,
    ArrowLeftIcon,
    ArrowRightIcon
} from '@heroicons/react/24/solid'
import AddUser from "../../components/Adduser";
import DeleteModal from "../../components/DeleteModal";
import SuccessDialog from "../../components/SuccessDialog";
import Search from "./search";


export default function Users(props) {
    const { users, totalPages, currentPage } = props;
    const router = useRouter()

    // state
    const [searchResult, setSearchResult] = useState([]);
    const [cheked, setCheked] = useState(false);
    const [userData, setUserData] = useState({
        userId: 0,
        userName: "",
        userEmail: "",
        userGender: "",
    })
    const [keyword, setKeyword] = useState("");
    const [isOpen, setIsOpen] = useState({
        edit: false,
        delete: false,
        success: false,
        action: "",
    });

    //handle add user
    const handleAddUser = async () => {
        await addUser({
            name: userData.userName,
            gender: userData.userGender,
            email: userData.userEmail,
            status: "active",
        })

        resetInputValue()
        openSuccessModal()
        refreshPage()
    }

    // handle edit selected user
    async function handleEdit(user_id) {
        const req = await getUser(user_id)
        const res = await req.data;

        setIsOpen({ ...isOpen, edit: true, action: "update" })
        setUserData({
            ...userData,
            userId: res?.id,
            userName: res?.name,
            userEmail: res?.email,
            userGender: res?.gender
        })

    }

    // hanlde update user
    async function handleUpdateUsers() {
        await updateUser(userData.userId, {
            name: userData.userName,
            gender: userData.userGender,
            email: userData.userEmail,
        })

        resetInputValue()
        openSuccessModal()
        refreshPage()
    }

    // select Gender Radio input
    const selectGender = (e) => {
        setUserData({ ...userData, userGender: e.target.value })
    }

    // fast refresh
    const refreshPage = () => {
        router.replace(router.asPath);
    }

    // cancel edit handle
    const cancelEdit = () => {
        setIsOpen({ ...isOpen, edit: false, action: "" })
        resetInputValue()
    }

    // handle Modal delete
    const openModalDelete = (user_id, user_name) => {
        setIsOpen({ ...isOpen, delete: true, action: "delete" })
        setUserData({ ...userData, userId: user_id, userName: user_name })
    }

    const closeModalDelete = () => {
        setIsOpen({ ...isOpen, delete: false })
        resetInputValue()
    }

    //handle modal success action
    const openSuccessModal = () => {
        setIsOpen({ ...isOpen, success: true, delete: false, edit: false })
    }

    const closeSuccessModal = () => {
        setIsOpen({ ...isOpen, success: false, action: "" })
        refreshPage()
        resetInputValue()
    }

    // handle search feature
    const handleSearch = async (user_name) => {
        const req = await searchUser(user_name)
        const res = req.data;

        setSearchResult(res)
        if (res.length === 0) {
            setCheked(true)
        }


        setTimeout(() => {
            setCheked(false)
        }, 2000)
    }

    // close search and reset
    const handleCloseSearch = () => {
        setSearchResult([])
        setKeyword("")
        setCheked(false)
        refreshPage()
    }

    // reset input value
    const resetInputValue = () => {
        setUserData({
            ...userData,
            userId: 0,
            userName: "",
            userEmail: "",
            userGender: "",
        })
    }

    // handle button validation input
    const allowSubmit = !(!userData.userName || !userData.userEmail || !userData.userGender)
    const allowSearch = !(!keyword)

    return (
        <>
            <div className="px-10 my-5 flex items-start justify-center gap-3 flex-col sm:flex-row">
                <div className={`p-4 bg-white w-full sm:w-1/2 flex flex-col items-center justify-center gap-2 ${isOpen.edit ? "border border-[#516BEB] shadow-lg shadow-[#516BEB]" : ""}`}>
                    <AddUser
                        userData={userData}
                        setUserData={setUserData}
                        selectGender={selectGender}
                        handleAddUser={handleAddUser}
                        allowSubmit={allowSubmit}
                        handleUpdateUsers={handleUpdateUsers}
                        cancelEdit={cancelEdit}
                        isEdit={isOpen.edit}
                        isDelete={isOpen.delete}
                    />

                </div>
                <div className="w-full flex items-center justify-center flex-col gap-2 ">
                    <div className="w-full flex items-center justify-center gap-2">
                        <input type="text" className="border border-[#516BEB] w-full p-2 rounded-sm" placeholder="search users..." name="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                        {keyword.length > 0 ? (
                            <button className="-ml-9" onClick={() => { handleCloseSearch() }}>
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        ) : null}
                        <button disabled={!allowSearch} className="p-1 bg-[#516BEB] hover:bg-[#4359c3] rounded-sm disabled:opacity-70 disabled:pointer-events-none" onClick={() => handleSearch(keyword)}><MagnifyingGlassCircleIcon className="w-8 h-8 text-white" /></button>
                    </div>

                    {cheked ? (
                        <div className="flex items-center justify-center py-2 px-5 bg-white shadow-sm w-full rounded-sm">
                            <div className="font-sans">"<b>{keyword}</b>" Not Found</div>
                        </div>
                    ) : (
                        null
                    )}

                    {searchResult.length > 0 ? (
                        <Search searchResult={searchResult} />
                    ) : (
                        <>
                            {users.map((user) => (
                                <div key={user?.id} className="flex items-center justify-between py-2 px-5 bg-white shadow-sm w-full rounded-sm">
                                    <div className="flex items-center justify-center gap-2">
                                        <UserCircleIcon className="h-8 w-8 text-[#516BEB]" />
                                        <div className="font-medium">{user?.name}</div>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <Link href={`/users/${user?.id}`}>
                                            <button className="bg-[#EAE509] hover:bg-[#cdcb3a] p-2 rounded-md"><EyeIcon className="h-4 w-4 text-black" /></button>
                                        </Link>
                                        <button className="bg-[#42C2FF] hover:bg-[#349ac9] p-2 rounded-md"><PencilSquareIcon className="h-4 w-4 text-black" onClick={() => handleEdit(user?.id)} /></button>
                                        <button className="bg-[#B73E3E] hover:bg-[#8d3131] p-2 rounded-md"><TrashIcon className="h-4 w-4 text-white" onClick={() => openModalDelete(user?.id, user?.name)} /></button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                    {searchResult.length === 0 ? (
                        <div className="flex justify-between items-center gap-5 my-2">
                            <button
                                className="bg-[#516BEB] hover:bg-[#4459c4] text-white font-bold py-2 px-4 rounded-l disabled:opacity-70 disabled:pointer-events-none"
                                disabled={currentPage === 1}
                                onClick={() => router.push(`/users?page=${currentPage - 1}`)}
                            >
                                <ArrowLeftIcon className="w-5 h-5" />
                            </button>
                            <span className="font-medium text-ms">Pages {currentPage}/{totalPages}</span>
                            <button
                                className="bg-[#516BEB] hover:bg-[#4459c4] text-white font-bold py-2 px-4 rounded-r disabled:opacity-70 disabled:pointer-events-none"
                                disabled={currentPage === totalPages}
                                onClick={() => router.push(`/users?page=${currentPage + 1}`)}
                            >
                                <ArrowRightIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ) : null}

                </div>
            </div>
            <DeleteModal
                isOpen={isOpen.delete}
                closeModalDelete={closeModalDelete}
                userData={userData}
                openSuccessModal={openSuccessModal}
            />
            <SuccessDialog show={isOpen.success} isAction={isOpen.action} closeModal={closeSuccessModal} />
        </>
    )
}

export async function getServerSideProps({ query }) {
    const page = parseInt(query.page) || 1;

    const req = await getAllUsers(page);
    const res = await req.data;

    return {
        props: {
            users: res,
            totalPages: Math.ceil(100 / 10),
            currentPage: page,
        }
    }
}

