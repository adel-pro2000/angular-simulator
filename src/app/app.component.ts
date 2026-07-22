import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import './training';
import { Color } from '../enums/color'
import { Collection } from './collection';
import { iService } from '../interfaces/iService';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnInit, OnDestroy {
  public isLoading: boolean = true;
  public currentDate: string = new Date().toLocaleString('ru-RU');

  public readonly companyName: string = 'румтибет';

  public selectedLocation: string = '';
  public selectedDate: string = '';
  public selectedParticipants: string = '';
  public liveText: string = '';

  private loadingTimerId: number | undefined;
  private dateTimerId: number | undefined;

  public clickCount: number = 0;

  public isDateVisible: boolean = true;

  public readonly services: iService[] = [
    {
      id:1, 
      title: 'Опытный гид', 
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: '/images/guide-icon.svg',
      alt: 'Иконка опытного гида'
    },
    {
      id:2, 
      title: 'Безопасный поход', 
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: '/images/shield-icon.svg',
      alt: 'Иконка безопасного похода'
    },
    {
      id:3, 
      title: 'Лояльные цены', 
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: '/images/price-icon.svg',
      alt: 'Иконка бирки'
    }
  ];

  public constructor() {
    this.saveLastVisit();
    this.saveVisitsCount();

    const users = new Collection<string>(['Лев', 'Максимильян', 'Марат', 'Яков', 'Григорий ']);
    console.log(users.getAll());
    console.log(users.getDeterminate(2));
    users.replace(1, 'Жан-Поль');
    users.remove(0);

    const phoneNumbers = new Collection<string> (['+7-904-777-41-74', '+7-917-857-54-11', '+7-908-528-41-80', '+7-903-342-85-75', '+7-901-854-44-00']);
    console.log(phoneNumbers.getAll());
    console.log(phoneNumbers.getDeterminate(4));
    phoneNumbers.replace(2, '2-525-854');
    phoneNumbers.clear();
    console.log(phoneNumbers.getAll());
  }

  public ngOnInit(): void {
    this.loadingTimerId = window.setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    this.dateTimerId = window.setInterval(() => {
      this.currentDate = new Date().toLocaleString('ru-RU');
  }, 1000);
  }

  public ngOnDestroy(): void {
    if (this.loadingTimerId !== undefined) {
      window.clearTimeout(this.loadingTimerId);
    }

    if (this.dateTimerId !== undefined) {
      window.clearInterval(this.dateTimerId);
    }
  }

  public incrementCount(): void {
    this.clickCount += 1;
  }

  public decrementCount(): void {
    if (this.clickCount > 0) {
      this.clickCount -= 1;
    }
  }

  public toggleHeaderWidget(): void {
    this.isDateVisible = !this.isDateVisible;
  }

  public chooseTour(): void {
    console.log('Локация:', this.selectedLocation);
    console.log('Дата:', this.selectedDate);
    console.log('Участники:', this.selectedParticipants);
}

  private isPrimaryColor(color: Color): boolean {
    return (
      color === Color.RED ||
      color === Color.GREEN ||
      color === Color.BLUE
    );
  }

  private saveLastVisit(): void {
    localStorage.setItem('lastVisit', new Date().toISOString());
  }

  private saveVisitsCount(): void {
    const visits = Number(localStorage.getItem('visits')) || 0;

    localStorage.setItem('visits', String(visits + 1));
  }
}