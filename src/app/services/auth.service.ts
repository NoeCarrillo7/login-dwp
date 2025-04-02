import { Injectable } from '@angular/core';
import { Auth, user, User, browserSessionPersistence,signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, GoogleAuthProvider, setPersistence, signInWithPopup } from 'firebase/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User | null>;

  constructor(private firebaseAuth: Auth) {
    this.user$ = user(this.firebaseAuth)
    this.setSessionStoragePersistence()
  }

  private setSessionStoragePersistence():void{
    setPersistence(this.firebaseAuth, browserSessionPersistence)
  }

  //medoto para el login
  login(email:string, password:string): Observable<void>{
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth, email, password
    ).then(()=>{
      console.log('Usuario autentificado correctamente');
    })
    return from(promise)
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.firebaseAuth, provider);
  }

  // Método para registro
  register(email: string, password: string): Observable<User> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then((userCredential) => {
        console.log('Usuario registrado correctamente');
        return userCredential.user;
      });

    return from(promise);
  }

  //metodo para el logout
  logout(): Observable<void>{
    const promise = signOut(this.firebaseAuth).then(()=>{
      sessionStorage.clear()
      console.log('Usuario deslogeado correctamente');
    })
    return from(promise)
  }
}
