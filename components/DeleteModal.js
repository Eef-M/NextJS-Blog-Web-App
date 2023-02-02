import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { deleteUser } from "../services";


export default function DeleteModal(props) {

    const {
        isOpen,
        closeModalDelete,
        userData,
        openSuccessModal
    } = props;


    const handleDelete = async () => {
        await deleteUser(userData.userId);

        closeModalDelete()

        setTimeout(() => {
            openSuccessModal()
        }, 500)
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModalDelete}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-sm bg-white p-6 text-left align-middle shadow-xl transition-all space-y-4">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Delete User
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to delete this user? "<b>{userData.userName}</b>"
                                        </p>
                                    </div>

                                    <div className="w-full flex items-center justify-end gap-3">
                                        <button className="bg-gray-400 hover:bg-gray-600 py-2 px-4 font-bold text-white rounded-sm" onClick={closeModalDelete}>Cancel</button>
                                        <button className="bg-[#B73E3E] hover:bg-[#8d3131] py-2 px-4 font-bold text-white rounded-sm" onClick={handleDelete}>Delete</button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}