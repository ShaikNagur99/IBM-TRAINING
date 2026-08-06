import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FundTransferService, Account } from './fundTransfer.service';

describe('FundTransferService', () => {
  let service: FundTransferService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/accounts';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FundTransferService]
    });

    service = TestBed.inject(FundTransferService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch accounts', () => {
    const mockAccounts: Account[] = [{ id: 1, accountNumber: '123', balance: 100 }];

    service.getAccounts().subscribe((accounts) => {
      expect(accounts).toEqual(mockAccounts);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockAccounts);
  });

  it('should create an account', () => {
    const account: Account = { accountNumber: '123', balance: 100 };

    service.createAccount(account).subscribe((createdAccount) => {
      expect(createdAccount).toEqual({ ...account, id: 1 });
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(account);
    req.flush({ ...account, id: 1 });
  });

  it('should update account balance', () => {
    service.updateBalance(1, 200).subscribe((updatedAccount) => {
      expect(updatedAccount.balance).toBe(200);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ balance: 200 });
    req.flush({ id: 1, accountNumber: '123', balance: 200 });
  });

  it('should delete an account', () => {
    service.deleteAccount(1).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
