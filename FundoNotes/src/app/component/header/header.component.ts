import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { REMINDER_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, ARCHIVE_ICON, MORE_ICON, DELETE_FOREVER_ICON, RESTORE_ICON, UNARCHIVE_ICON, REDO_ICON, UNDO_ICON, TICK_ICON, EDIT_ICON, PIN_ICON, LIST_VIEW_ICON, OTHER_MENU_ICON, MENU_ICON, SEARCH_ICON, SETTING_ICON } from '../../../assets/svg-icons';
import { DataServiceService } from '../../services/data/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  searchQuery: string='';
  userInitial: string = '';
  userName: string = '';
  userEmail: string = '';
  @Output() menuToggle: EventEmitter<void> = new EventEmitter<void>();

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private dataService: DataServiceService, private router: Router) {
    iconRegistry.addSvgIconLiteral('search-icon', sanitizer.bypassSecurityTrustHtml(SEARCH_ICON));
    iconRegistry.addSvgIconLiteral('collabrator-icon', sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON));
    iconRegistry.addSvgIconLiteral('color-palatte-icon', sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON));
    iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON));
    iconRegistry.addSvgIconLiteral('setting-icon', sanitizer.bypassSecurityTrustHtml(SETTING_ICON));
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON));
    iconRegistry.addSvgIconLiteral('delete-forever-icon', sanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON));
    iconRegistry.addSvgIconLiteral('restore-icon', sanitizer.bypassSecurityTrustHtml(RESTORE_ICON));
    iconRegistry.addSvgIconLiteral('unarchive-icon', sanitizer.bypassSecurityTrustHtml(UNARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('redo-icon',sanitizer.bypassSecurityTrustHtml(REDO_ICON));
    iconRegistry.addSvgIconLiteral('undo-icon',sanitizer.bypassSecurityTrustHtml(UNDO_ICON));
    iconRegistry.addSvgIconLiteral('tick-icon',sanitizer.bypassSecurityTrustHtml(TICK_ICON));
    iconRegistry.addSvgIconLiteral('edit-icon',sanitizer.bypassSecurityTrustHtml(EDIT_ICON));
    iconRegistry.addSvgIconLiteral('pin-icon',sanitizer.bypassSecurityTrustHtml(PIN_ICON));
    iconRegistry.addSvgIconLiteral('menu-icon',sanitizer.bypassSecurityTrustHtml(MENU_ICON));
    iconRegistry.addSvgIconLiteral('list-view-icon',sanitizer.bypassSecurityTrustHtml(LIST_VIEW_ICON));
    iconRegistry.addSvgIconLiteral('other-menu-icon',sanitizer.bypassSecurityTrustHtml(OTHER_MENU_ICON));
  }
  
  ngOnInit() {
    const user = localStorage.getItem('loggedInUser');
    if(user) {
      console.log('user:',user);
      const parsedUser = JSON.parse(user);
      console.log('parseduser:',parsedUser);
      this.userInitial = (parsedUser.firstName.charAt(0) + parsedUser.lastName.charAt(0)).toUpperCase();
      this.userName = `${parsedUser.firstName} ${parsedUser.lastName}`;
      this.userEmail = parsedUser.email;
    }
  }

  onMenuClick() {
    this.menuToggle.emit(); // Emit the event when menu icon is clicked
  }

  handleSearchQuery() {
    this.dataService.updateSearchQuery(this.searchQuery);
  }
  LogOut(){
    localStorage.clear();
    this.router.navigate(['']);
  }
}
