import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AppComponent } from 'src/app/app.component';
import { AfipService } from 'src/app/services/afip.service';


@Component({
    selector: 'app-wizard',
    templateUrl: './wizard.component.html'
})

export class WizardComponent implements OnInit {
    currentUser: User;
    wizard: any[] = [];
    constructor(
                private router: Router,
                public app: AppComponent,
                private afipService: AfipService
    ) {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.getwizardList();
    }

    ngOnInit(): void {
        window.scroll(0, 0);
    }

    // private getwizardList() {
    //     this.afipService.getwizardList()
    //         .then(
    //             data => {
    //                 if (data.OperationStatus === 'Ok') {
    //                     this.wizard = data.wizardList;
    //                 }
    //             })
    //         .catch(error => this.handleError(error));
    // }

    private handleError(error): void {
        this.app.showLoader = false;
        this.app.showNotification('error', error);
    }
}
