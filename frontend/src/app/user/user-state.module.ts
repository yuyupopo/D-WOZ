import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: 'signin', pathMatch: 'full', component: SignInComponent}])
  ],
  declarations: [SignInComponent],
  providers: [

  ],
  exports: []
})
export class UserStateModule {}
