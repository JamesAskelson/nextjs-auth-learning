
import PostList from "@/components/posts/post-list";
import { fetchPostsBySearch } from "@/db/queries/posts";
import { redirect } from "next/navigation";
interface SearchPagePros {
    searchParams: {
        term: string;
    }
}


export default function SearchPage({ searchParams}: SearchPagePros) {
    const { term } = searchParams;

    if(!term){
        redirect('/');
    }



    return <div>
        <PostList fetchData={() => fetchPostsBySearch(term)} />
    </div>
}
