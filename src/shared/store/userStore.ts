import { makeAutoObservable } from 'mobx';

export interface User {
  id: string;
  name: string;
}

export class UserStore {
  currentUser: User | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setCurrentUser(user: User | null) {
    this.currentUser = user;
  }

  get isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}
