import { Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PostVisualizationComponent } from './post-visualization/post-visualization.component';

export const routes: Routes = [
    {path: 'dashboard', component: PostListComponent},
    {path: 'visualize', component: PostVisualizationComponent},
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];
