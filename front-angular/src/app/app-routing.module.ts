import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './common/guard/auth-guard/auth-guard.service';
import { OtherGuardService } from './common/guard/other-guard/other-guard.service';
import { MetaTagService } from './common/services/meta-tag.service';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [

  
  { 
    path: 'dashboard',
    canActivate: [
      MetaTagService,
      AuthGuardService
    ],
    data: {
      title: 'Blog | Dashboard',
      description: '',
    },
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) 
  },
  { 
    path: '',
    canActivate: [
      MetaTagService,
      AuthGuardService
    ],
    data: {
      title: 'Blog | Dashboard',
      description: '',
    },
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },

  { path: 'auth', canActivate: [OtherGuardService], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { 
    path: 'not-found', 
    canActivate: [AuthGuardService], 
    component: NotFoundComponent,
    data: { 
      title: 'Blog | 404',
      description: '',
    },
  },
  {
    path: "**",
    redirectTo: 'not-found' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
