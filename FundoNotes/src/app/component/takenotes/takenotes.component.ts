import { Component, EventEmitter, Inject, Optional, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { REMINDER_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, ARCHIVE_ICON, MORE_ICON, DELETE_FOREVER_ICON, RESTORE_ICON, UNARCHIVE_ICON, REDO_ICON, UNDO_ICON, TICK_ICON, EDIT_ICON, PIN_ICON } from '../../../assets/svg-icons';
import { NotesService } from '../../services/notes/notes.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-takenotes',
  templateUrl: './takenotes.component.html',
  styleUrl: './takenotes.component.scss'
})



export class TakenotesComponent {

  // expandTakeNote: boolean = false;
  showEnterNote = true; // Boolean variable to control visibility
  noteTitle: string = ''; // For title input
  noteContent: string = ''; // For note content
  color: string = "#ffffff";
  isArchive : boolean = false;
  @Output() updateList = new EventEmitter<{ data: any, action: string }>();

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private notesService: NotesService, @Optional() @Inject(MAT_DIALOG_DATA) public data: any, @Optional() public dialogRef: MatDialogRef<TakenotesComponent>) {

    console.log(data);
    if (data) {
      const { expandnote, noteDetails } = data;
      this.showEnterNote = expandnote;
      this.noteTitle = noteDetails.title;
      this.noteContent = noteDetails.description;
      this.color = noteDetails.color;
    }


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

  colorvalue(colore: string){
    this.color = colore;
  }

  archive(){
    this.isArchive=true;
  }

  addNote(action: string) {
    this.showEnterNote = !this.showEnterNote;

    if (this.data) action = 'edit';

    if (action == 'add') {
      const reqData = {
        title: this.noteTitle,
        description: this.noteContent,
        color: this.color,
        isArchived: this.isArchive
      };

      this.notesService.addNote(reqData).subscribe({
        next: (response: any) => {
          console.log('note added successfully', response);
          this.updateList.emit({ data: response.status.details, action: this.isArchive? 'archive' : 'add' });
          this.resetNoteFields();
          this.showEnterNote = !this.showEnterNote;
        },
        error: (error: any) => {
          console.log('error in adding note', error);
        }
      })
    }

    else if (action == 'edit'){
      const {noteDetails} = this.data;
      console.log('data:', this.data);

      this.notesService.updateNote({...noteDetails, noteId: noteDetails.id, title: this.noteTitle, description: this.noteContent}).subscribe({
        next: (res: any) => {
          console.log('note updated',res);
          this.updateList.emit({data: noteDetails, action: 'edit'});
        },
        error: (error: any) => {
          console.log('error in updating note', error);
        }
      })

      this.dialogRef.close({...noteDetails,title: this.noteTitle, description: this.noteContent});
    }
  }

  resetNoteFields() {
    this.noteTitle = '';
    this.noteContent = '';
  }

  handleNotesIconClick(action: string, color: string) { }

}
