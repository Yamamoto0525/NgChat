import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SessionEffects } from './session.effects';

describe('SessionEffects', () => {
  let actions$: Observable<any>;
  let effects: SessionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SessionEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SessionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
