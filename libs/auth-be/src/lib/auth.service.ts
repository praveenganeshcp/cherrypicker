import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Method to handle user login
  async login(username: string, password: string): Promise<any> {
    // Validate user credentials
    // This is a placeholder, replace with actual user validation logic
    const user = { username: 'test', passwordHash: await hash('password', 10) };

    if (username !== user.username || !(await compare(password, user.passwordHash))) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Method to handle user logout
  async logout(): Promise<void> {
    // Implement logout functionality if needed (e.g., invalidate token)
  }

  // Method to validate a JWT token
  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new Error('Invalid token');
    }
  }

  // Method to refresh the JWT token (Optional)
  async refreshToken(token: string): Promise<any> {
    // Implement token refresh logic if necessary
  }

  // Utility function for role-based authorization
  async hasRole(user: any, role: string): Promise<boolean> {
    // Implement role check logic, assuming user object contains roles
    return user.roles && user.roles.includes(role);
  }
}
