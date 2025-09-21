export abstract class AuthService {
  
  // Abstract method for user login
  abstract login(username: string, password: string): Promise<any>;

  // Abstract method for user logout
  abstract logout(userId: string): Promise<void>;

  // Abstract method for validating a user
  abstract validateUser(userId: string, token: string): Promise<boolean>;

  // Abstract method for registering a user
  abstract registerUser(userData: any): Promise<any>;
}