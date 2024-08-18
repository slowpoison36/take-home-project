import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../../services/post.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule,
  ],
})
export class AddPostComponent implements OnInit {
  postForm!: FormGroup;
  users: Array<any> = [];
  isSubmitted: boolean = false;
  postService = inject(PostService);
  fb: FormBuilder = inject(FormBuilder);
  dialogRef = inject(MatDialogRef, {optional: true})

  ngOnInit() {
    this.createForm();
    this.getUsers();
  }

  private createForm(): void {
    this.postForm = this.fb.group({
      userId: ['', Validators.required],
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  private getUsers(): void {
    this.postService.getAllCurrentUsers().subscribe((users) => {
      this.users = users;
    });
  }

  public addPost(): void {
    this.isSubmitted = true;
    if (!this.postForm.invalid) {
      this.postService.addPost(this.postForm.value).subscribe(() => {
        this.dialogRef?.close();
        this.postForm.reset();
      });
    }
  }

  public cancelAdd(): void {
    this.postForm.reset();
    this.dialogRef?.close();
  }
}
