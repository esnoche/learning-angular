import {Component,} from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.service";

@Component({
    selector : "app-create-post",
    templateUrl : "./create-post.component.html",
    styleUrl : "./create-post.component.css"
})

export class CreatePostComponent {
    enteredTitle: string = "";
    enteredContent: string = "";
    
    constructor(public postsService: PostsService) {}

    onCreatePost(postForm : NgForm){
        if(postForm.invalid){
            return;
        }
        this.postsService.addPost(postForm.value.enteredTitle, postForm.value.enteredContent);
        postForm.resetForm();
    }
}