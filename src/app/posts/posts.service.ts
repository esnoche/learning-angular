


























import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { postCreation } from "./post.model";
import { postRetrieval } from "./post.model";
import { Subject } from 'rxjs';
// import { response } from "express";
// import { map } from "rxjs";
// import { response } from "express";

@Injectable({ providedIn: 'root' }) //
export class PostsService {


    // private posts: postCreation[] = [];
    private postsUpdate = new Subject<postRetrieval[]>();

    private postList: postRetrieval[] = [];

    constructor(private http: HttpClient) { }

    getPosts() {

        this.http.get<{ message: string, retrievedPosts: postRetrieval[] }>("http://localhost:3000/api/posts/get-posts")
            .subscribe((response) => {
                console.log(response.message);
                // console.log(response.retrievedPosts.)
                this.postList = response.retrievedPosts;
                this.postsUpdate.next([...this.postList]);
            })
    }

    getPostUpdates() {
        return this.postsUpdate.asObservable();
    }

    addPost(title: string, content: string) {

        const post: postCreation = {
            title: title,
            content: content,
        };

        this.http.post<{ message: string }>("http://localhost:3000/api/posts/add-post", post)
            .subscribe((response) => {
                console.log(response.message);
                this.getPosts();
            })

    }

    deletePost(id: string) {
        this.http.delete<{ message: string }>(`http://localhost:3000/api/posts/delete-post/${id}`)
            .subscribe((response) => {
                console.log(response.message);
                this.getPosts();
            })
    }
}