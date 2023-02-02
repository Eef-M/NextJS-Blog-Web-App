import React from 'react'

const AddUser = (props) => {
    const {
        userData,
        setUserData,
        selectGender,
        handleAddUser,
        allowSubmit,
        handleUpdateUsers,
        isEdit,
        cancelEdit,
        isDelete,
    } = props;

    return (
        <>
            <div className="text-xl font-bold">{isEdit ? "Edit" : "Add"} User</div>
            <div className="w-full h-[2px] bg-[#516BEB]"></div>
            <div className="flex flex-col items-start justify-center w-full my-3">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input id="name" value={isDelete ? "" : userData.userName} type="text" className="border border-gray-400 w-full rounded-sm p-2" placeholder="your name" onChange={(e) => setUserData({ ...userData, userName: e.target.value })} />
            </div>
            <div className="flex flex-col items-start justify-center w-full mb-3">
                <div className="text-sm font-medium">Gender</div>
                <div className="flex items-center justify-start gap-7">
                    <div className="flex items-center justify-center gap-2">
                        <input id="male" type="radio" className="border border-gray-400 w-full rounded-sm p-2" name="gender" value="male" onChange={selectGender} checked={userData.userGender === "male"} />
                        <label htmlFor="male" className="font-sans">Male</label>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <input id="female" type="radio" className="border border-gray-400 w-full rounded-sm p-2" name="gender" value="female" onChange={selectGender} checked={userData.userGender === "female"} />
                        <label htmlFor="female" className="font-sans">Female</label>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full mb-3">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input id="email" type="text" className="border border-gray-400 w-full rounded-sm p-2" placeholder="your email" value={userData.userEmail} onChange={(e) => setUserData({ ...userData, userEmail: e.target.value })} />
            </div>
            {isEdit ? (
                <>
                    <button disabled={!allowSubmit} className="bg-[#516BEB] text-white font-bold py-2 w-full rounded-sm disabled:opacity-[0.7]" onClick={handleUpdateUsers}>Update</button>
                    <button className="bg-gray-400 text-white font-bold py-2 w-full rounded-sm disabled:opacity-[0.7]" onClick={cancelEdit}>Cancel</button>
                </>
            ) : (
                <button disabled={!allowSubmit} className="bg-[#516BEB] text-white font-bold py-2 w-full rounded-sm disabled:opacity-[0.7]" onClick={handleAddUser}>Submit</button>
            )}
        </>
    )
}

export default AddUser