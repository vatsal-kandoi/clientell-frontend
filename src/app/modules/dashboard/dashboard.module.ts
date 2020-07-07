import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './components/items/user/user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { ProjectItemComponent } from './components/items/project-item/project-item.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UsersComponent } from './pages/users/users.component';
import { DashboardRoutingModule } from './dashboard.routing';



@NgModule({
  declarations: [DashboardComponent, HomeComponent, UserComponent, NavbarComponent, ProjectDetailsComponent, AddProjectComponent, CommentsComponent, ProjectItemComponent, AddUserComponent, UsersComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
