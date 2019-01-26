import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

 
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // this is our local internal store
  // not accessable to external code that could manipulate
  // the data
  private _users: BehaviorSubject<User[]>;

  private dataStore: {
    users: User[];
  }

  constructor(private https: HttpClient) {
    this.dataStore = { users: [] };
    // new up our local internal store
    this._users = new BehaviorSubject<User[]>([]);
  }

  // subscribe to our local internal store
  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  //TODO: Fake save requires update to http
  addUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      // fake from Db
      user.id = this.dataStore.users.length + 1;
      // push to internal data store
      this.dataStore.users.push(user);
      this._users.next(Object.assign({}, this.dataStore).users);
      resolve(user)
    });
  }

  LoadAll() {
    const userUrl = 'https://angular-material-api.azurewebsites.net/users';

    return this.https.get<User[]>(userUrl)
      .subscribe(data => {
        this.dataStore.users = data;
        // Copy data obj to isolate the data from manipulation
        // and expose this data
        this._users.next(Object.assign({}, this.dataStore).users);
      }, error => {
        console.log(error);
        console.error("UserService::LoadAll(): Failed to fetch data");
      }
      )
  }

  userById(id: number): User {
    return this.dataStore.users.find(x => x.id == id);
  }
}
