import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import{LoginGuardGuard}from'./Guards/login-guard.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'event/:codigoEvento', loadChildren: './event/event.module#EventPageModule' },
  { path: 'options', loadChildren: './options/options.module#OptionsPageModule',canActivate:[LoginGuardGuard]  },
  { path: 'search-event', loadChildren: './search-event/search-event.module#SearchEventPageModule' },
  { path: 'participants/:codigoEvento', loadChildren: './participants/participants.module#ParticipantsPageModule' },
  { path: 'categories/:codigoEvento', loadChildren: './categories/categories.module#CategoriesPageModule' },
  { path: 'parameters/:codigoEvento', loadChildren: './parameters/parameters.module#ParametersPageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
