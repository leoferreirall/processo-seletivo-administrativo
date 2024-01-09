import { AuthService } from '@services/auth/auth.service';

export class Guard {

  constructor(public authService: AuthService){
  }

  public acessoCandidato(){
   return this.authService.validateRole('GG_USERS_LIBERA_ADMIN_LOCAL_DESENV')
    || this.authService.validateRoleAtendimento('GG_USERS_LIBERA_ADMIN_LOCAL_DESENV')
  }
}
