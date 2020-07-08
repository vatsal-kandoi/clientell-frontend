import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { UsersComponent } from './pages/users/users.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { AllProjectsComponent } from './pages/all-projects/all-projects.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'comments',
        component: CommentsComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'project',
        component: ProjectDetailsComponent
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
