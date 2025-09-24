import { Routes } from '@angular/router';

// ---------------- Admin Components ----------------
import { AdminDashboardComponent } from './component/admin/admin-dashboard/admin-dashboard';
import { ManageArticlesComponent } from './component/admin/manage-articles/manage-articles';
import { ManageUsersComponent } from './component/admin/manage-users/manage-users';
import { ManageLikesComponent } from './component/admin/manage-likes/manage-likes';
import { ManageCommentsComponent } from './component/admin/manage-comments/manage-comments';
import { AdminSettingsComponent } from './component/admin/admin-settings/admin-settings';

// ---------------- Admin Auth Component ----------------
import { AdminLoginComponent } from './component/admin/admin-login/admin-login';

// ---------------- User Auth Components ----------------
import { UserLoginComponent } from './component/user/auth/user-login/user-login';
import { UserRegisterComponent } from './component/user/auth/user-register/user-register';
import { ForgotPasswordComponent } from './component/user/auth/forgot-password/forgot-password';
import { UserDashboardComponent } from './component/user/auth/user-dashboard/user-dashboard';

// ---------------- User Pages (children of user-dashboard) ----------------
// NOTE: HomeComponent is intentionally NOT used as the default child anymore.
// If you still need HomeComponent later, you can keep it and add a route for it explicitly.

import { HomeComponent } from './component/user/auth/user-dashboard/home/home';
import { ExploreComponent } from './component/user/auth/user-dashboard/explore/explore';
import { Write } from './component/user/auth/user-dashboard/write/write';
import { About } from './component/user/auth/user-dashboard/about/about';
import { Profile } from './component/user/auth/user-dashboard/profile/profile';


export const routes: Routes = [
  // ---------------- Default ----------------

  // ---------------- User Authentication ----------------
  { path: 'user-login', component: UserLoginComponent },
  { path: 'login', redirectTo: 'user-login', pathMatch: 'full' }, // alias
  { path: 'register', component: UserRegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  // ---------------- User Dashboard ----------------
  {
  
  path: 'user-dashboard',
  component: UserDashboardComponent,
  children: [
    { path: '', component: HomeComponent }, // default when visiting /user-dashboard
    { path: 'home', component: HomeComponent }, // explicit /user-dashboard/home
    { path: 'explore', component: ExploreComponent },
    { path: 'write', component: Write },
    { path: 'about', component: About },
    { path: 'profile', component: Profile }
  ]
},


  // ---------------- Admin Authentication ----------------
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin', redirectTo: 'admin-login', pathMatch: 'full' }, // alias

  // ---------------- Admin Dashboard ----------------
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'manage-articles', component: ManageArticlesComponent },
  { path: 'manage-users', component: ManageUsersComponent },
  { path: 'manage-likes', component: ManageLikesComponent },
  { path: 'manage-comments', component: ManageCommentsComponent },
  { path: 'admin-settings', component: AdminSettingsComponent },

  // ---------------- Fallback ----------------
  { path: '**', redirectTo: '' } // fallback to Welcome
];
