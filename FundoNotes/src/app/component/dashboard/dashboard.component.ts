import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ARCHIVE_ICON, EDIT_ICON, NOTE_ICON, REMINDER_ICON, TRASH_ICON } from '../../../assets/svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  host: {
    class: 'app-dashboard-cnt'
  }
})
export class DashboardComponent {
  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer){
    iconRegistry.addSvgIconLiteral('note-icon', sanitizer.bypassSecurityTrustHtml(NOTE_ICON));
    iconRegistry.addSvgIconLiteral('reminder-icon', sanitizer.bypassSecurityTrustHtml(REMINDER_ICON));
    iconRegistry.addSvgIconLiteral('edit-icon', sanitizer.bypassSecurityTrustHtml(EDIT_ICON));
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('trash-icon', sanitizer.bypassSecurityTrustHtml(TRASH_ICON));
  }

}
