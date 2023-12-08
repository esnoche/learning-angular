import {Component, OnInit,} from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector : "app-create-post",
    templateUrl : "./create-post.component.html",
    styleUrl : "./create-post.component.css"
})

export class CreatePostComponent implements OnInit {
    enteredTitle: string = "";
    enteredContent: string = "";
    
    private mode = "create";
    private postId = "invalid";


    constructor(public postsService: PostsService, public route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((organizer) => {
            if(organizer.has("id")) {
                this.mode = "edit";
                this.postId = organizer.get("id")
            } else {
                this.mode = "create";
            }
        })
    }


    onCreatePost(postForm : NgForm){
        if(postForm.invalid){
            return;
        }
        this.postsService.addPost(postForm.value.enteredTitle, postForm.value.enteredContent);
        postForm.resetForm();
    }
}