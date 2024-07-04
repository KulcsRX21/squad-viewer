import {Component, EventEmitter, Output} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'sv-toolbar',
  standalone: true,
  imports: [MatIcon, MatIconButton, MatToolbar],
  template: `
    <mat-toolbar>
      <button mat-icon-button (click)='toggle.emit()'>
        <mat-icon>menu</mat-icon>
      </button>
      <span>Squad Viewer</span>
    </mat-toolbar>
  `
})
export class ToolbarComponent {
  @Output() toggle = new EventEmitter();
}
