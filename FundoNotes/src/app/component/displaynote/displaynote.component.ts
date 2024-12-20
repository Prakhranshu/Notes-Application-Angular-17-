import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { REMINDER_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, ARCHIVE_ICON, MORE_ICON, DELETE_FOREVER_ICON, RESTORE_ICON, UNARCHIVE_ICON, EDIT_ICON, PIN_ICON, REDO_ICON, TICK_ICON, UNDO_ICON } from '../../../assets/svg-icons';
import { NotesService } from '../../services/notes/notes.service';

@Component({
  selector: 'app-displaynote',
  templateUrl: './displaynote.component.html',
  styleUrl: './displaynote.component.scss'
})
export class DisplaynoteComponent {
  @Input() noteDetails: any = {};
  @Output() updateList = new EventEmitter();
  @Input() container: string = "notes";



  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private notesService: NotesService) {
    iconRegistry.addSvgIconLiteral('reminder-icon', sanitizer.bypassSecurityTrustHtml(REMINDER_ICON));
    iconRegistry.addSvgIconLiteral('collabrator-icon', sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON));
    iconRegistry.addSvgIconLiteral('color-palatte-icon', sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON));
    iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON));
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON));
    iconRegistry.addSvgIconLiteral('delete-forever-icon', sanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON));
    iconRegistry.addSvgIconLiteral('restore-icon', sanitizer.bypassSecurityTrustHtml(RESTORE_ICON));
    iconRegistry.addSvgIconLiteral('unarchive-icon', sanitizer.bypassSecurityTrustHtml(UNARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('redo-icon', sanitizer.bypassSecurityTrustHtml(REDO_ICON));
    iconRegistry.addSvgIconLiteral('undo-icon', sanitizer.bypassSecurityTrustHtml(UNDO_ICON));
    iconRegistry.addSvgIconLiteral('tick-icon', sanitizer.bypassSecurityTrustHtml(TICK_ICON));
    iconRegistry.addSvgIconLiteral('edit-icon', sanitizer.bypassSecurityTrustHtml(EDIT_ICON));
    iconRegistry.addSvgIconLiteral('pin-icon', sanitizer.bypassSecurityTrustHtml(PIN_ICON));
  }

  handleNotesIconClick(action: string) {
    //based on action call the api
    const noteId = this.noteDetails?.id; // Fetch the note ID
    let requestData: any = {};

    switch (action) {
      case 'archive':
        requestData = { noteIdList: [noteId], isArchived: true };
        this.notesService.archive(requestData).subscribe({
          next: (response: any) => {
            console.log('Note archived:', response);
            this.updateList.emit({ data: this.noteDetails, action });
          },
          error: (err: any) => {
            console.log('Error:', err);
          }
        });
        break;

      case 'unarchive':
        requestData = { noteIdList: [noteId], isArchived: false };
        this.notesService.archive(requestData).subscribe({
          next: (response: any) => {
            console.log('Note unarchived:', response);
            this.updateList.emit({ data: this.noteDetails, action });
          },
          error: (err: any) => {
            console.log('Error', err);
          }
        });
        break;

      case 'trash':
        requestData = { noteIdList: [noteId], isDeleted: true };
        this.notesService.trash(requestData).subscribe({
          next: (response: any) => {
            console.log('Note trashed:', response);
            this.updateList.emit({ data: this.noteDetails, action });
          },
          error: (err: any) => {
            console.log('Error', err);
          }
        });
        break;

      case 'untrash':
        requestData = { noteIdList: [noteId], isDeleted: false };
        this.notesService.trash(requestData).subscribe({
          next: (response: any) => {
            console.log('Note restored from trash:', response);
            this.updateList.emit({ data: this.noteDetails, action });
          },
          error: (err: any) => {
            console.log('Error', err);
          }
        });
        break;

      case 'deleteForever':
        requestData = { noteIdList: [noteId] };
        this.notesService.deleteForever(requestData).subscribe({
          next: (response: any) => {
            console.log('Note deleted forever:', response);
            this.updateList.emit({ data: this.noteDetails, action });
          },
          error: (err: any) => {
            console.log('Error', err);
          }
        });
        break;

      default:
        console.log('Unhandled action:', action);
        // this.updateList.emit({ data: this.noteDetails, action: action })
    }
  }
}
