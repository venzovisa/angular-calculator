import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let routerEventsSubject: Subject<RouterEvent>;

  beforeEach(async () => {
    routerEventsSubject = new Subject<RouterEvent>();

    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            events: routerEventsSubject.asObservable(),
            createUrlTree: () => ({}),
            serializeUrl: () => ({}),
          },
        },
        [
          {
            provide: ActivatedRoute,
            useValue: {},
          },
        ],
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with empty activeRoute', () => {
    expect(component.activeRoute).toBe('');
  });

  it('should update activeRoute when router events are emitted', () => {
    const mockUrl = '/calculator';
    const mockEvent = { url: mockUrl } as RouterEvent;

    routerEventsSubject.next(mockEvent);

    expect(component.activeRoute).toBe(mockUrl);
  });

  it('should update activeRoute multiple times when different router events are emitted', () => {
    const urls = ['/calculator', '/history', '/settings'];

    urls.forEach((url) => {
      const mockEvent = { url } as RouterEvent;
      routerEventsSubject.next(mockEvent);
      expect(component.activeRoute).toBe(url);
    });
  });

  afterEach(() => {
    routerEventsSubject.complete();
  });
});
