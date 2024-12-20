import { Component } from '@angular/core';
import { NotesService } from '../../services/notes/notes.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.scss'
})
export class ArchiveComponent {
  archiveList: any[]= [];

  constructor(private notesService: NotesService){}

  ngOnInit(){
    this.notesService.displaynotes().subscribe({
      next: (res: any) => {
        console.log(res);
        this.archiveList = res.data.data.filter((note:any) => note.isArchived === true && note.isDeleted === false);
      },
      error: (err: any) =>{
        console.log(err);
      }
    })
  }

  handleArchiveNotesList($event:{data:any, action:string}) {
    const {data,action} = $event;
    console.log($event);
    if(action ==='unarchive'){
      this.archiveList=this.archiveList.filter((note:any) => note.id !== data.id);
    }
  }

}
