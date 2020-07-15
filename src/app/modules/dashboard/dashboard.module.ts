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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {TokenInterceptor} from '../login/_interceptors/token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { LoginService } from '../login/_services/login.service';
import { TokenService } from '../login/_services/token.service';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import { ProjectOverviewComponent } from './pages/project-overview/project-overview.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AddItemMobileComponent } from './components/add-item/add-item-mobile/add-item-mobile.component';
import { AddItemDesktopComponent } from './components/add-item/add-item-desktop/add-item-desktop.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from './shared/_pipes/date.pipe';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthGuardService } from '../login/_guards/auth.guard';
import { ConfirmMobileComponent } from './components/confirm/confirm-mobile/confirm-mobile.component';
import { ConfirmDesktopComponent } from './components/confirm/confirm-desktop/confirm-desktop.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar} from '@angular/material/snack-bar';
import { CommentService } from './shared/_services/comment.service';
import { ProjectsService } from './shared/_services/projects.service';
import { ActiveProjectService } from './shared/_services/active-project.service';
import { UserService } from './shared/_services/user.service';

@NgModule({
  declarations: [DashboardComponent, HomeComponent, UserComponent, NavbarComponent, ProjectDetailsComponent, CommentsComponent, ProjectItemComponent, AddUserComponent, UsersComponent, LogoutComponent, ProjectNavbarComponent, AllProjectsComponent, AddProjectMobileComponent, AddProjectDesktopComponent, ProjectOverviewComponent, AddItemMobileComponent, AddItemDesktopComponent, DatePipe, ConfirmMobileComponent, ConfirmDesktopComponent, TopNavbarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
    MatNativeDateModule,
    MatButtonModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatBottomSheetModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [
    CommentService,
    ProjectsService, 
    ActiveProjectService,
    UserService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}}
  ]
})

export class DashboardModule { }
