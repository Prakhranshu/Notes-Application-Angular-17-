import { Component } from '@angular/core';
import { NotesService } from '../../services/notes/notes.service';
import { Subscription } from 'rxjs';
import { DataServiceService } from '../../services/data/data-service.service';

@Component({
  selector: 'app-displayallnotes',
  templateUrl: './displayallnotes.component.html',
  styleUrl: './displayallnotes.component.scss'
})
export class DisplayallnotesComponent {
  notesList: any[] = [];
  searchQuery: string = '';
  subscription!: Subscription;

  constructor(private noteService: NotesService, private dataService: DataServiceService) { }

  ngOnInit() {
    this.noteService.displaynotes().subscribe({
      next: (res: any) => {
        console.log('notes fetched', res);
        this.notesList = res.data.data;
      },
      error: (err: any) => {
        console.log('error in displayallnotes', err);
      }
    });

    this.subscription = this.dataService.currSearchQuery.subscribe({
      next: (res: any) => {
        this.searchQuery = res;
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  handleNotesList($event: { data: any, action: string }) {
    console.log($event);
    const { data, action } = $event
    console.log('data:',data,'action:',action);
    if (action == "add") {
      this.notesList = [data, ...this.notesList]
      console.log(this.notesList);
    }
    else if (action == "trash" || action == "archive") {
      this.notesList = this.notesList.filter((note: any) => note.id != data.id)
    }
    else if (action == "color" || action == "edit") {
      this.notesList = this.notesList.map((note)=>{
        if( note.id == data.id) return data;
        return note;
      })
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
