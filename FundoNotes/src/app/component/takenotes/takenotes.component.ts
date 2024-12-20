import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { REMINDER_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, ARCHIVE_ICON, MORE_ICON, DELETE_FOREVER_ICON, RESTORE_ICON, UNARCHIVE_ICON, REDO_ICON, UNDO_ICON, TICK_ICON, EDIT_ICON, PIN_ICON } from '../../../assets/svg-icons';
import { NotesService } from '../../services/notes/notes.service';

@Component({
  selector: 'app-takenotes',
  templateUrl: './takenotes.component.html',
  styleUrl: './takenotes.component.scss'
})



export class TakenotesComponent {

  showEnterNote = true; // Boolean variable to control visibility
  noteTitle: string = ''; // For title input
  noteContent: string = ''; // For note content
  @Output() updateList = new EventEmitter<{data:any, action:string}>();

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

  

  toggleNotes() {
    this.showEnterNote = !this.showEnterNote;
  }

  addNote() {
    const reqData = {
      title: this.noteTitle,
      description: this.noteContent
    };

    this.notesService.addNote(reqData).subscribe({
      next: (response: any) => {
        console.log('note added successfully', response);
        this.updateList.emit({data: response.status.details, action: "add"})
        this.resetNoteFields();
        this.toggleNotes();
      },
      error: (error: any) => {
        console.log('error in adding note', error);
      }
    })    
  }

  resetNoteFields() {
    this.noteTitle = '';
    this.noteContent = '';
  }

}
