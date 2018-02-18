import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CongeeMySuffixComponent } from './congee-my-suffix.component';
import { CongeeMySuffixDetailComponent } from './congee-my-suffix-detail.component';
import { CongeeMySuffixPopupComponent } from './congee-my-suffix-dialog.component';
import { CongeeMySuffixDeletePopupComponent } from './congee-my-suffix-delete-dialog.component';

export const congeeRoute: Routes = [
    {
        path: 'congee-my-suffix',
        component: CongeeMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Congees'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'congee-my-suffix/:id',
        component: CongeeMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Congees'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const congeePopupRoute: Routes = [
    {
        path: 'congee-my-suffix-new',
        component: CongeeMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Congees'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'congee-my-suffix/:id/edit',
        component: CongeeMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Congees'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'congee-my-suffix/:id/delete',
        component: CongeeMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Congees'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
