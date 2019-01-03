import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'ps-app-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

}