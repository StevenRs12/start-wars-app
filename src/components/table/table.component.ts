import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { Observable, Subscription } from 'rxjs';
import { People, ResponsePeople } from '../../interfaces/people.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  public people$!: Observable<ResponsePeople>
  public totalPages: number = 0;
  public characters: People[] = [];
  public pagesArray: number[] = []
  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.getPeoplePaginate(1)
  }

  getPeoplePaginate(page: number = 1) {
    this.pagesArray = []
    this.peopleService.getPeople(page).subscribe({
      next: data => {
        this.characters = data.results;
        this.totalPages = this.getTotalPages(data.results.length, data.count);
        for (let index = 0; index <= data.results.length; index++) {
          this.pagesArray.push(index + 1)
        }
        console.log(this.pagesArray)
      },
      error: err => console.error('Observable emitted an error: ' + err),
    })
  }

  getTotalPages(totalResults: number, count: number): number {
    return Math.ceil(count / totalResults)
  }

}
