import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { TakenotesComponent } from './component/takenotes/takenotes.component';
import { DisplaynoteComponent } from './component/displaynote/displaynote.component';
import { HeaderComponent } from './component/header/header.component';
import { DisplayallnotesComponent } from './component/displayallnotes/displayallnotes.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { TrashComponent } from './component/trash/trash.component';
import { ArchiveComponent } from './component/archive/archive.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'addnote', component: TakenotesComponent },
  { path: 'displaynote', component: DisplaynoteComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'displaynotes', component: DisplayallnotesComponent },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      {
        path: 'displayallnotes', component: DisplayallnotesComponent
      },
      {
        path: 'archive', component: ArchiveComponent
      },
      {
        path: 'trash', component: TrashComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
