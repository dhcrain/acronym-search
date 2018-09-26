import {Injectable} from "@angular/core";
import * as acronymActions from "../actions/acronym.actions";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {catchError, first, map, switchMap} from "rxjs/operators";
import {SearchService} from "../../services/search/search.service";
import {Acronym} from "../../model/acronym.model";
import {of} from "rxjs/observable/of";

@Injectable()
export class AcronymEffect {
    constructor(private actions$: Actions, private _searchService: SearchService) {}

    @Effect()
    addAcronym$ = this.actions$.pipe(
        ofType(acronymActions.SEARCH_ACRONYM),
        map(action => action["payload"]),
        switchMap((payload) => {
            const code = payload["code"];
            const projectName = payload["project"];
            return this._searchService.search(code, projectName).pipe(
                map(changes => {
                    if (changes.length > 0) {
                        return changes.map(a => {
                            const data = a.payload.doc.data() as Acronym;
                            data.id = a.payload.doc.id;
                            return data;
                        })[0];
                    } else {
                        return {code: code};
                    }
                }),
                catchError(error => of(new acronymActions.SearchAcronymFail((error))))
            );
        }),
        map(data => new acronymActions.SearchAcronymSuccess(data))
    );
}
