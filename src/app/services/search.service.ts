import { Injectable } from "@angular/core";
import {AngularFirestore} from "angularfire2/firestore";
import {Acronym} from "../model/acronym.model";
import {config} from "../app.config";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SearchService {
  result: Observable<Acronym[]>;

  constructor(private db: AngularFirestore) {}

  search(code: string) {
        this.result = this.db.collection(config.collectionEndpoint, ref => ref.where("code", "==", code).limit(1)).snapshotChanges()
          .pipe(map(changes => {
              if (changes.length > 0) {
                  return changes.map(a => {
                      const data = a.payload.doc.data() as Acronym;
                      data.id = a.payload.doc.id;
                      return data;
                  });
              } else {
                  return [{} as Acronym];
              }
          }));
  }
}
