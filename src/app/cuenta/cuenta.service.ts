import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IUsuarioClave} from "../usuarios/usuarios.models";
import {Observable} from "rxjs";
import {SERVER_API_URL} from "../app.constants";

@Injectable({
  providedIn: 'root'
})

export class CuentaService{

  public claveUrl = SERVER_API_URL + 'api/cuenta/cambiarclave';

  constructor(private http: HttpClient) {}

  updatePassword(usuario: IUsuarioClave):Observable<any>{
    return this.http.patch<IUsuarioClave>(this.claveUrl, usuario, {observe: 'response'});
  }
}
