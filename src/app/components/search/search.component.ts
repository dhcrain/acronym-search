import { Component, OnInit } from "@angular/core";
import {FormControl} from "@angular/forms";
import {SearchService} from "../../services/search.service";
import {Observable} from "rxjs";
import {AngularFirestoreCollection} from "angularfire2/firestore";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
    code = new FormControl("");
    list: AngularFirestoreCollection<{}>;

    constructor(private searchService: SearchService) { }

    ngOnInit() {
    }

    beginSearch(codeString: string) {
        if (codeString.length >= 2) {
            this.list = this.searchService.search(codeString);
        }
    }

}
