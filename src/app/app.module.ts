import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { AssignUserModalComponent } from './assign-user-modal/assign-user-modal.component';
import { CreateTicketModalComponent } from './create-ticket-modal/create-ticket-modal.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketListFilterFormComponent } from './ticket-list-filter-form/ticket-list-filter-form.component';
import { TicketListGridComponent } from './ticket-list-grid/ticket-list-grid.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { RootStoreModule } from './_store/root-store.module';

@NgModule({
  declarations: [
    AppComponent,
    TicketListComponent,
    TicketDetailComponent,
    TicketListFilterFormComponent,
    TicketListGridComponent,
    CreateTicketModalComponent,
    AssignUserModalComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RootStoreModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CreateTicketModalComponent, AssignUserModalComponent]
})
export class AppModule {}
