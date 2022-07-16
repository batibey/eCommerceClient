import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService : HttpClientService, private toastrService: CustomToastrService) { }
  async login(usernameOrEmail: string, password: string, callBackFunction?: () => void): Promise<any>{
    const observable: Observable<any | TokenResponse> =  this.httpClientService.post<any | TokenResponse>({
      controller: "auth",
      action: "login"
    },{ usernameOrEmail, password })

    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);

      this.toastrService.message("Giriş Başarılı","Success", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    }
      
    callBackFunction();
  }
}
