import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TicketWithUser } from '../_models';
import {
  RootStoreSelectors,
  RootStoreState,
  TicketStoreActions
} from '../_store';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
  ticketWithUser$: Observable<TicketWithUser>;

  constructor(
    private store: Store<RootStoreState.RootState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ticketWithUser$ = this.store.select(
      RootStoreSelectors.selectCurrentTicketWithUser
    );

    const ticketId = +this.route.snapshot.paramMap.get('id');

    this.store.dispatch(
      new TicketStoreActions.SelectTicketAction({ ticketId })
    );
  }
}
