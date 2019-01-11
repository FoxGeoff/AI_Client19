import { ContactmanagerModule } from './contactmanager.module';

describe('ContactmanagerModule', () => {
  let contactmanagerModule: ContactmanagerModule;

  beforeEach(() => {
    contactmanagerModule = new ContactmanagerModule();
  });

  it('should create an instance', () => {
    expect(contactmanagerModule).toBeTruthy();
  });
});
