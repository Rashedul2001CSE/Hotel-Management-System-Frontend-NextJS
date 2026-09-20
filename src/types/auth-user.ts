export interface AuthUser {
  id: string;
  fullName: string;
  userName: string | null;
  email: string | null;
  roles: string[];
}
