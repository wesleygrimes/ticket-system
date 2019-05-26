import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  RootStoreSelectors,
  TicketStoreActions,
  UserStoreActions
} from './_store';
import { RootState } from './_store/root-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  error$: Observable<string>;
  isLoading$: Observable<boolean>;

  constructor(private store: Store<RootState>) {}

  ngOnInit() {
    this.error$ = this.store.select(RootStoreSelectors.selectError);
    this.isLoading$ = this.store.select(RootStoreSelectors.selectIsLoading);
    this.store.dispatch(new UserStoreActions.LoadUsersAction());
    this.store.dispatch(new TicketStoreActions.LoadTicketsAction());
  }
}
