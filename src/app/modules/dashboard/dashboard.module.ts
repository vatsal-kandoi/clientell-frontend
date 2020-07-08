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
import { LogoutComponent } from './components/logout/logout.component';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ProjectNavbarComponent } from './components/navbar/sub-components/project-navbar/project-navbar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AllProjectsComponent } from './pages/all-projects/all-projects.component';
import {MatDividerModule} from '@angular/material/divider';



@NgModule({
  declarations: [DashboardComponent, HomeComponent, UserComponent, NavbarComponent, ProjectDetailsComponent, AddProjectComponent, CommentsComponent, ProjectItemComponent, AddUserComponent, UsersComponent, LogoutComponent, ProjectNavbarComponent, AllProjectsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DashboardModule { }
