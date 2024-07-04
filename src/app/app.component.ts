import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { SquadComponent } from '../squad/squad.component';

@Component({
  selector: 'sv-app',
  standalone: true,
  imports: [MatSidenavModule, ToolbarComponent, SidenavComponent, SquadComponent],
  template: `
    <div id='sv-app'>
      <sv-toolbar (toggle)="sidenav.toggle()" />
      <mat-sidenav-container>
        <mat-sidenav #sidenav mode='side' opened>
          <sv-sidenav (toggle)="sidenav.toggle()" />
        </mat-sidenav>
        <mat-sidenav-content>
          <sv-squad />
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: `
    #sv-app { height: 100%; display: flex; flex-direction: column; }
    mat-sidenav { padding: 5px; width: 340px; }
    mat-sidenav-container { flex: 1; }
    mat-sidenav-content { padding: 10px; }
  `
})
export class AppComponent {}
