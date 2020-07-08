import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './components/items/user/user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
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
import {MatDialogModule} from '@angular/material/dialog';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { AddProjectMobileComponent } from './components/add-project/add-project-mobile/add-project-mobile.component';
import { AddProjectDesktopComponent } from './components/add-project/add-project-desktop/add-project-desktop.component';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [DashboardComponent, HomeComponent, UserComponent, NavbarComponent, ProjectDetailsComponent, CommentsComponent, ProjectItemComponent, AddUserComponent, UsersComponent, LogoutComponent, ProjectNavbarComponent, AllProjectsComponent, AddProjectMobileComponent, AddProjectDesktopComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatBottomSheetModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DashboardModule { }
