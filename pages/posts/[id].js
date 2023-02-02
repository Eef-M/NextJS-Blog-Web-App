import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { addComment, getComments, getPost, getUser } from '../../services';


export default function DetailPosts(props) {
    const { post, user, comments } = props;
    const router = useRouter();

    //state
    const [nameComment, setNameComment] = useState("");
    const [emailComment, setEmailComment] = useState("");
    const [bodyComment, setBodyComment] = useState("");

    const refreshPage = () => {
        router.replace(router.asPath);
    }

    const handleSubmitComment = async () => {
        await addComment(post?.id, {
            name: nameComment,
            email: emailComment,
            body: bodyComment
        });

        resetInputValue();
        refreshPage();
    }

    const resetInputValue = () => {
        setNameComment("");
        setEmailComment("");
        setBodyComment("");
    }

    const allowSubmit = !(!nameComment || !emailComment || !bodyComment);

    return (
        <>
            <div className="px-10 my-5 flex items-center justify-center flex-col gap-4">
                <div className="bg-white p-5 rounded-md">
                    <div className="text-black text-xl font-bold">{post?.title}</div>
                    <div className="my-3 flex items-center justify-start gap-2">
                        <UserCircleIcon className="h-12 w-12 text-[#516BEB]" />
                        <div>
                            <div className="text-[#516BEB] text-md text-sm font-medium">
                                {user === null ? "Unknown" : user?.name}
                            </div>
                            <div className="text-gray-400 text-md text-sm">
                                {user === null ? "Unknown" : user?.email}
                            </div>
                        </div>
                    </div>
                    <div className="text-gray-900 font-sans text-justify">{post?.body}</div>
                </div>

                <div className="bg-white p-5 rounded-md w-full flex flex-col items-start justify-center gap-6">
                    <div className='font-medium'>{comments.length} comments</div>
                    {comments.map((comment) => (
                        <div key={comment?.id} className='flex items-start justify-start gap-3'>
                            <div className='flex items-start justify-center flex-col'>
                                <UserCircleIcon className="h-7 w-7 text-gray-500" />
                            </div>
                            <div className='flex items-start justify-center flex-col'>
                                <div className='text-black text-lg'>{comment?.name}</div>
                                <div className='text-black bg-[#FFFCDC] py-3 px-5 rounded-lg shadow-md font-sans my-2'>{comment?.body}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-white p-5 rounded-md w-full flex flex-col items-start justify-center gap-4">
                    <div className='font-bold'>Add Comment</div>
                    <div className='flex items-center justify-center w-full gap-2'>
                        <input type="text" value={nameComment} className='border border-[#516BEB] rounded-md py-1 px-4 w-full' placeholder='name' onChange={(e) => setNameComment(e.target.value)} />
                        <input type="text" value={emailComment} className='border border-[#516BEB] rounded-md py-1 px-4 w-full' placeholder='email' onChange={(e) => setEmailComment(e.target.value)} />
                    </div>
                    <textarea className='w-full border border-[#516BEB] rounded-md py-2 px-4' value={bodyComment} placeholder='comment' onChange={(e) => setBodyComment(e.target.value)}></textarea>
                    <button disabled={!allowSubmit} className='py-2 px-4 bg-[#516BEB] rounded-md hover:bg-[#1C6DD0] font-bold text-white disabled:pointer-events-none disabled:opacity-[0.6]' onClick={handleSubmitComment}>submit</button>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps({ params }) {
    // detail posts
    const reqDetailPost = await getPost(params.id)
    const resDetailPost = await reqDetailPost.data

    // detail users
    const reqDetailUsers = await getUser(resDetailPost.user_id)
    const resDetailUsers = await reqDetailUsers.data

    // get post comments
    const reqPostComments = await getComments(resDetailPost.id)
    const resPostComments = await reqPostComments.data

    return {
        props: {
            post: resDetailPost,
            user: resDetailUsers ?? null,
            comments: resPostComments
        }
    }
}
