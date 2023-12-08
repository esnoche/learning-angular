import { Component } from "@angular/core";

@Component({
    selector : 'app-header',
    templateUrl : './header.component.html',
    styleUrl : './header.component.css'
})
export class HeaderComponent {

    // toolbarElements = ["Home", "Add Post", "Edit Post"];
    toolbarElements = [
        {
            name: "Home",
            path: ""
        }, {
            name: "Add Post",
            path: "create"
        }
    ]

}