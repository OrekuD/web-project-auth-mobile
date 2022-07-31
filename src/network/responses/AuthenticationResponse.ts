import User from "../../models/User";

export default interface AuthenticationResponse {
  accessToken: string;
  expiryAt: number;
  user: User;
}
