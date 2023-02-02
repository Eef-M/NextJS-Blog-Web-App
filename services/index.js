import axios from "axios";

// get all posts
export async function getAllPosts(page) {
    return await axios.get(`${process.env.NEXT_PUBLIC_API}/public/v2/posts?access-token=${process.env.NEXT_PUBLIC_TOKEN}&page=${page}&per_page=10`)
        .catch((error) => {
            return error;
        })
}

// get posts by id
export async function getPost(id) {
    return await axios.get(`${process.env.NEXT_PUBLIC_API}/public/v2/posts/${id}?access-token=${process.env.NEXT_PUBLIC_TOKEN}`)
        .catch((error) => {
            return error;
        })
}

// get all users
export async function getAllUsers(page) {
    return await axios.get(`${process.env.NEXT_PUBLIC_API}/public/v2/users?access-token=${process.env.NEXT_PUBLIC_TOKEN}&page=${page}&per_page=10`)
        .catch((error) => {
            return error;
        })
}

// get users by id
export async function getUser(user_id) {
    return await axios.get(`${process.env.NEXT_PUBLIC_API}/public/v2/users/${user_id}?access-token=${process.env.NEXT_PUBLIC_TOKEN}`)
        .catch((error) => {
            return error;
        })
}

// post new user 
export async function addUser(payload) {
    return await axios.post(`${process.env.NEXT_PUBLIC_API}/public/v2/users?access-token=${process.env.NEXT_PUBLIC_TOKEN}`, payload)
        .catch((error) => {
            return error;
        })
}

// update user
export async function updateUser(id_user, payload) {
    return await axios.patch(`${process.env.NEXT_PUBLIC_API}/public/v2/users/${id_user}?access-token=${process.env.NEXT_PUBLIC_TOKEN}`, payload)
        .catch((error) => {
            return error;
        })
}

// delete user
export async function deleteUser(user_id) {
    return await axios.delete(`${process.env.NEXT_PUBLIC_API}/public/v2/users/${user_id}?access-token=${process.env.NEXT_PUBLIC_TOKEN}`)
        .catch((error) => {
            return error;
        })
}

// search user by name
export async function searchUser(user_name) {
    return await axios.get(`${process.env.NEXT_PUBLIC_API}/public/v2/users?name=${user_name}&access-token=${process.env.NEXT_PUBLIC_TOKEN}`)
        .catch((error) => {
            return error;
        })
}

// get comments post
export async function getComments(post_id) {
    return await axios.get(`${process.env.NEXT_PUBLIC_API}/public/v2/posts/${post_id}/comments?access-token=${process.env.NEXT_PUBLIC_TOKEN}`)
        .catch((error) => {
            return error;
        })
}

// post comment
export async function addComment(post_id, payload) {
    return await axios.post(`${process.env.NEXT_PUBLIC_API}/public/v2/posts/${post_id}/comments?access-token=${process.env.NEXT_PUBLIC_TOKEN}`, payload)
        .catch((error) => {
            return error;
        })
}