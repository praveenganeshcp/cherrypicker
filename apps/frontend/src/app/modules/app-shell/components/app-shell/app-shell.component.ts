import { Component } from '@angular/core';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cp-app-shell',
  standalone: true,
  imports: [RouterModule, AppHeaderComponent],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
})
export class AppShellComponent {}
