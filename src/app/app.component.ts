import {Component, ViewChild} from "@angular/core";
import {AuthService} from "./modules/auth/services/auth/auth.service";
import {Observable} from "rxjs";
import {User} from "@app/model/user.model";
import {map} from "rxjs/operators";
import {select, Store} from "@ngrx/store";
import {AppState} from "@app/store/app.state";
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    user$: Observable<User>;
    @ViewChild("sideNav") sideNav: MatSidenav;

    constructor(public store: Store<AppState>, public authService: AuthService, private _router: Router) {
        this.user$ = this.store.pipe(select(state => state.authUser), map(data => data ? data["user"] : null));
    }

    navigateToProjects() {
        this.closeSideNav();
        this._router.navigate(["/projects"]);
    }

    closeSideNav() {
       return this.sideNav.close();
    }
}
