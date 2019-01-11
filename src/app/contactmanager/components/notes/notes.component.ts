import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Note } from '../../models/note';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  @Input() notes: Note[];

  displayedColumns: string[] = ['position', 'title', 'date'];
  dataSource: MatTableDataSource<Note>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort

  constructor() { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Note>(this.notes);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
