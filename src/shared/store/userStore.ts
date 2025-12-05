import type { UserRole } from '@shared/api/types/auth';
import { makeAutoObservable } from 'mobx';

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export class UserStore {
  currentUser: User | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setCurrentUser(user: User | null) {
    this.currentUser = user;
  }

  logout() {
    this.currentUser = null;
  }

  get isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  get role(): UserRole | null {
    return this.currentUser?.role ?? null;
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === 'ADMIN';
  }
}
