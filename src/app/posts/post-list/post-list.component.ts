import { Component, OnDestroy, OnInit } from "@angular/core";
import { postRetrieval } from "../post.model";
import { PostsService } from "../posts.service";
import {Subscription} from 'rxjs';

@Component({
    selector : 'app-post-list',
    templateUrl : './post-list.component.html',
    styleUrl : './post-list.component.css'
})

export class PostListComponent implements OnInit, OnDestroy {
    postList: postRetrieval[] = [];

    private postsSub: Subscription = new Subscription;

    constructor(public postsService: PostsService) {
        // "public" here creates a local instance of "postsService" with the same name
        // so this avoids the use of "this" keyword and creating a new local variable
        // also we need to add "PostsServices" inside providers

    }

    ngOnInit(): void {

        this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdates().subscribe(
            (updatedList: postRetrieval[])=>{
                this.postList = updatedList;
            }
        )        
    }

    ngOnDestroy(): void {
        this.postsSub.unsubscribe();
    }

    onDelete(_id: string) {
        this.postsService.deletePost(_id);
        
    }

}