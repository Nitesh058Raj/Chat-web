import { Injectable } from '@angular/core';
import { User } from '../interfaces/shared.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDetails!: User;

  constructor() {}

  // Method to set user details from the login component
  setUserDetails(userDetails: User) {
    this.userDetails = userDetails;
  }

  // Method to get user details in the chat-window component
  getUserDetails() {
    return this.userDetails;
  }

  isAuthenticated() {
    return this.userDetails !== undefined;
  }
}
