import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { UsersComponent } from './pages/users/users.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { AllProjectsComponent } from './pages/all-projects/all-projects.component';
import { ProjectOverviewComponent } from './pages/project-overview/project-overview.component';
import { 
  AuthGuardService as AuthGuard } from '../login/_services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'project',
        component: ProjectOverviewComponent,
        children: [
          {
            path: '',
            component: ProjectDetailsComponent
          },
          {
            path: 'comments',
            component: CommentsComponent
          },
          {
            path: 'users',
            component: UsersComponent
          },
        ]
      },
      {
        path: 'projects',
        component: AllProjectsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
