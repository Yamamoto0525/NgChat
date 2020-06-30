import * as fromSession from './session.actions';

describe('loadSessions', () => {
  it('should return an action', () => {
    expect(fromSession.loadSessions().type).toBe('[Session] Load Sessions');
  });
});
