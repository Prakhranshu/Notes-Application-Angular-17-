import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  token: any
  constructor(private httpservice: HttpService) {
    this.token = localStorage.getItem('token');
  }

  addNote(reqData: any) {
    const fullUrl = `https://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes?access_token=${this.token}`;
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    console.log(this.token);
    return this.httpservice.postService(fullUrl, reqData, true, header);
  }

  displaynotes() {
    const fullUrl = `https://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList?access_token=${this.token}`;
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    }
    console.log(this.token);
    return this.httpservice.getService(fullUrl, true, header);
  }

  archive(reqData: any) {
    const fullUrl = `https://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes?access_token=${this.token}`;
    let header = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Bearer '+this.token
      })
    }
    return this.httpservice.postService(fullUrl,reqData,true,header);
  }

  trash(reqData: any) {
    const fullUrl = `https://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes?access_token=${this.token}`;
    let header = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Bearer '+this.token
      })
    }
    return this.httpservice.postService(fullUrl,reqData,true,header);
  }
  
  deleteForever(reqData: any) {
    const fullUrl = `https://fundoonotes.incubation.bridgelabz.com/api/notes/deleteForeverNotes?access_token=${this.token}`;
    let header = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Bearer '+this.token
      })
    }
    return this.httpservice.postService(fullUrl,reqData,true,header);
  }
  

}
