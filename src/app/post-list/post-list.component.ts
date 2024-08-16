import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { PostService } from '../services/post.service';
import { Post } from '../models/Post';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { AddPostComponent } from './add-post/add-post.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

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
    MatButtonModule,
    AddPostComponent,
    MatDialogModule,
  ],
})
export class PostListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  postService = inject(PostService);
  dataSource = new MatTableDataSource<Post>();
  displayedColumns: Array<string> = ['userId', 'id', 'title', 'body'];
  readonly dialog = inject(MatDialog);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.postService.getAllCurrentPosts().subscribe();
    this.postService.getAllCurrentUsers().subscribe();
    this.postService.cachedPost.subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  public showAddPostModal(): void {
    const dialogRef = this.dialog.open(AddPostComponent, {
      width: '500px',
    });
  }
}
