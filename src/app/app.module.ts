import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {environment} from "../environments/environment";
import {CodeSearchInputComponent} from "./components/search/code-search-input.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material/material.module";
import { ResultComponent } from "./components/result/result.component";
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { AcronymPageComponent } from "./components/acronym-page/acronym-page.component";
import {AuthGuard} from "./modules/auth/guards/auth/auth.guard";
import {AuthModule} from "./modules/auth/auth.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {EffectsModule} from "@ngrx/effects";
import {reducers, effects} from "./store";
import {UppercaseDirective} from "@app/directives/uppercase.directive";
import {StoreModule} from "@ngrx/store";
import {NgxMaskModule} from "ngx-mask";
import {FirebaseUIModule} from "firebaseui-angular";
import * as firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import { ProjectsPageComponent } from "./components/projects-page/projects-page.component";
import { AddProjectDialogComponent } from "./components/add-project-dialog/add-project-dialog.component";
import { DeleteProjectDialogComponent } from "./components/delete-project-dialog/delete-project-dialog.component";
import { SearchComponent } from "./components/search/search.component";

const firebaseUiAuthConfig: firebaseui.auth.Config = {
    signInFlow: "popup",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

const ROUTES: Routes = [
    {path: "acronym", component: AcronymPageComponent, canActivate: [AuthGuard]},
    {path: "projects", component: ProjectsPageComponent},
    {path: "login", component: LoginComponent},
    {path: "", component: LoginComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        CodeSearchInputComponent,
        ResultComponent,
        LoginComponent,
        AcronymPageComponent,
        UppercaseDirective,
        ResultComponent,
        ProjectsPageComponent,
        AddProjectDialogComponent,
        DeleteProjectDialogComponent,
        SearchComponent,
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(ROUTES),
        MaterialModule,
        AuthModule,
        FlexLayoutModule,
        NgxMaskModule.forRoot(),
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot(effects),
        FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    ],
    entryComponents: [
        AddProjectDialogComponent,
        DeleteProjectDialogComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
