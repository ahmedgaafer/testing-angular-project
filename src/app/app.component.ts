import { Component } from '@angular/core';
import { ShowcaseFormComponent } from './examples/showcase-form/showcase-form.component';

@Component({
  selector: 'app-root',
  imports: [ShowcaseFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-forms-showcase';
}
