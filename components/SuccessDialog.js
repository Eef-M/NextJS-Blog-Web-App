import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";


export default function SuccessDialog(props) {

    const { show, closeModal, isAction } = props;

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-sm bg-white p-6 text-left align-middle shadow-xl transition-all flex items-center justify-between">
                                    <div className="flex items-center justify-center gap-3">
                                        <CheckCircleIcon className="h-8 w-8 text-green-500 shadow-sm" />
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            User {isAction === "update" ? "Updated!" : isAction === "delete" ? "Deleted!" : "Added!"}
                                        </Dialog.Title>
                                    </div>
                                    <button onClick={closeModal}>
                                        <XMarkIcon className="h-6 w-6 text-gray-500" />
                                    </button>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}