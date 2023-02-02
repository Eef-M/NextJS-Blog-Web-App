import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { getAllPosts } from "../services";
import Router from "next/router";

export default function Home(props) {
    const { posts, totalPages, currentPage } = props;
    return (
        <>
            <div className="px-10 my-5">
                <div className="text-2xl font-semibold text-black">Posts</div>
                <div className="w-full h-[2px] bg-indigo-800 rounded-full opacity-[0.6] my-2"></div>
                {posts.map((post) => (
                    <div key={post?.id} className="my-5 text-justify bg-white p-4 rounded-sm shadow-sm">
                        <div className="text-black font-bold text-xl">{post?.title}</div>
                        <div className="my-4 whitespace-nowrap overflow-hidden text-ellipsis font-sans">{post?.body}</div>
                        <Link href={`/posts/${post.id}`}>
                            <button className="py-1 px-3 rounded-sm bg-[#516BEB] hover:bg-[#1C6DD0] font-medium text-white">Read More</button>
                        </Link>
                    </div>
                ))}
                <div className="flex justify-center items-center gap-5 my-2">
                    <button
                        className="bg-[#516BEB] hover:bg-[#4459c4] text-white font-bold py-2 px-4 rounded-l disabled:opacity-70 disabled:pointer-events-none"
                        disabled={currentPage === 1}
                        onClick={() => Router.push(`?page=${currentPage - 1}`)}
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </button>
                    <span className="font-medium text-ms">Pages {currentPage}/{totalPages}</span>
                    <button
                        className="bg-[#516BEB] hover:bg-[#4459c4] text-white font-bold py-2 px-4 rounded-r disabled:opacity-70 disabled:pointer-events-none"
                        disabled={currentPage === totalPages}
                        onClick={() => Router.push(`?page=${currentPage + 1}`)}
                    >
                        <ArrowRightIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps({ query }) {
    const page = parseInt(query.page) || 1;

    const req = await getAllPosts(page);
    const res = await req.data;

    return {
        props: {
            posts: res,
            totalPages: Math.ceil(100 / 10),
            currentPage: page,
        }
    }
}