import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rm-commit-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commit-info.component.html',
  styleUrl: './commit-info.component.scss',
})
export class CommitInfoComponent {
 
  @Input() message: string = '';

  @Input() timestamp!: Date;

  @Input() sha: string = '';

  @Input() url: string = '';
}
