import { Component } from '@angular/core';
import { NotesService } from '../../services/notes/notes.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrl: './trash.component.scss'
})
export class TrashComponent {

  trashList: any[] = []

  constructor(private noteServices: NotesService) { }

  ngOnInit() {
    this.noteServices.displaynotes().subscribe({
      next: (res: any) => {
        console.log(res)
        this.trashList = res.data.data.filter((note: any) =>
          note.isDeleted === true
        )
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  handleTrashNotesList($event: { data: any, action: string }) {
    const {data, action} = $event;
    console.log($event);
    if (action === 'deleteForever' || action === 'trash') {
      this.trashList = this.trashList.filter((note:any)=>note.id !== data.id)
    }
  }

}
