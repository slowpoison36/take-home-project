import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { PostService } from '../services/post.service';
import { Post } from '../models/Post';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-employees-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatCardContent,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [PostService],
})
export class PostListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  postService = inject(PostService);
  dataSource = new MatTableDataSource<Post>();

  displayedColumns: Array<string> = ['userId', 'id', 'title', 'body'];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.postService.getAllPosts().subscribe((result) => {
      this.dataSource.data = result;
    });
  }
}
