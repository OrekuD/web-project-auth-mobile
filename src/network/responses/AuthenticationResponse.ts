import User from '../../models/User';

export default interface AuthenticationResponse {
  accessToken: string;
  user: User;
}
