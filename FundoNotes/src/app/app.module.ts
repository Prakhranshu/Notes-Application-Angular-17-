import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './component/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { LoginComponent } from './component/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { TakenotesComponent } from './component/takenotes/takenotes.component';
import { MatIconModule } from '@angular/material/icon';
import { DisplaynoteComponent } from './component/displaynote/displaynote.component'; 
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './component/header/header.component';
import { DisplayallnotesComponent } from './component/displayallnotes/displayallnotes.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { TrashComponent } from './component/trash/trash.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { SearchPipe } from './pipe/search.pipe';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TakenotesComponent,
    DisplaynoteComponent,
    HeaderComponent,
    DisplayallnotesComponent,
    DashboardComponent,
    ArchiveComponent,
    TrashComponent,
    SidenavComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatSidenavModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
