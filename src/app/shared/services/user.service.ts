import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDetails: any;

  constructor() {
    this.userDetails = {
      name: 'User-1',
      email: 'user@mail.com',
    };
  }

  // Method to set user details from the login component
  setUserDetails(user: any) {
    this.userDetails = user;
  }

  // Method to get user details in the chat-window component
  getUserDetails() {
    return this.userDetails;
  }
}
