import { Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { EmployeeVisualizationComponent } from './employee-visualization/employee-visualization.component';

export const routes: Routes = [
    {path: 'dashboard', component: PostListComponent},
    {path: 'visualize', component: EmployeeVisualizationComponent},
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];
