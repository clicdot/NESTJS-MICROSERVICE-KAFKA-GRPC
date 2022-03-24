import { Observable } from 'rxjs';

export interface AuthGrpcService {
  login(login: Login): Observable<any>;
  create(key: ApiKey): Observable<any>;
}

interface ApiKey {
  key: string;
}

interface Login {
  username: string;
  password: string;
}
