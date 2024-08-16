import { Component, inject, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-employee-visualization',
  templateUrl: './post-visualization.component.html',
  styleUrls: ['./post-visualization.component.css'],
  standalone: true,
  imports: [BaseChartDirective],
})
export class EmployeeVisualizationComponent implements OnInit {
  private postService = inject(PostService);
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataset[] = [{ data: [], label: 'Posts count' }];

  ngOnInit() {
    this.populateBarDetails();
  }

  private populateBarDetails(): void {
    this.postService
      .getPostsAndUserDetails()
      .subscribe((result: Array<any>) => {
        this.barChartLabels = Array.from([
          ...new Set(result.map((res) => res.userName)),
        ]);
        const postByUser = result.reduce(
          (posts: { [key: string]: number }, currentPost) => {
            if (posts[currentPost.userName]) {
              posts[currentPost.userName]++;
            } else {
              posts[currentPost.userName] = 1;
            }
            return posts;
          },
          {}
        );
        this.barChartData[0].data = Object.values(postByUser);
      });
  }
}
