// src/app/services/party.service.ts
import { Injectable } from '@angular/core';
import { Party } from '../interfaces/party';
@Injectable({
  providedIn: 'root'
})
export class PartyService {
 public getParties(): Party[] {
    return [
      {
        name: 'Likud',
        description: 'The Likud party is a major center-right to right-wing political party in Israel.',
        imageUrl: 'https://pbs.twimg.com/profile_images/1520607737289318400/TQ9IDRB1_400x400.jpg'
      },
      {
        name: 'Yesh Atid',
        description: 'Yesh Atid is a centrist political party in Israel founded by Yair Lapid.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBtLfYQIxyqCOxfpceTXiNTA8nOhtl0rDWDA&s'
      },
      {
        name: 'Shas',
        description: 'Shas is a Haredi religious political party in Israel founded in 1984.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk4BTtPftUcOq1Dv8GstDFpgw14QBgfxeOkg&s'
      },
      {
        name: 'Labor Party',
        description: 'The Israeli Labor Party is a social democratic and Zionist political party.',
        imageUrl: 'https://cdn.i24news.tv/uploads/a1/22/4c/2e/fa/f6/ed/25/59/96/b6/08/4e/a2/35/f9/a1224c2efaf6ed255996b6084ea235f9.jpeg?width=1000'
      },
      {
        name: 'Meretz',
        description: 'Meretz is a left-wing, social-democratic, and green political party in Israel.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Flag_of_the_Meretz.svg/1200px-Flag_of_the_Meretz.svg.png'
      },
      {
        name: 'Yisrael Beiteinu',
        description: 'Yisrael Beiteinu is a secular nationalist political party in Israel.',
        imageUrl: 'https://en.idi.org.il/media/12117/beytenu.jpg?mode=crop&width=259&height=169'
      },
      {
        name: 'United Torah Judaism',
        description: 'United Torah Judaism is a Haredi political alliance in Israel.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/United_Torah_Judaism_Logo_2019.svg/640px-United_Torah_Judaism_Logo_2019.svg.png'
      },
      {
        name: 'Joint List',
        description: 'The Joint List is a political alliance of four Arab-majority political parties in Israel.',
        imageUrl: 'https://israelpolicyforum.org/wp-content/uploads/2019/08/JointList-1.jpg'
      },
      {
        name: 'New Hope',
        description: 'New Hope is a center-right political party in Israel founded by Gideon Sa\'ar.',
        imageUrl: 'https://www.idi.org.il/media/18302/%D7%AA%D7%A7%D7%95%D7%95%D7%94-%D7%97%D7%93%D7%A9%D7%94.png?mode=crop&width=259&height=169'
      },
      {
        name: 'Blue and White',
        description: 'Blue and White is a centrist political alliance in Israel.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXeuhDegcmu9RlTVV1vC6GKMxM_gjqUdthhg&s'
      },
      {
        name: 'Ra\'am',
        description: 'Ra\'am is an Arab political party in Israel and part of the Joint List.',
        imageUrl: 'https://img.mako.co.il/2022/10/01/mansur.png'
      },
 
   
      {
        name: 'The Jewish Home',
        description: 'The Jewish Home is a right-wing political party in Israel.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwsDmUcWDzgxh1i97RZ7N4eT_wly7j88M0Eg&s'
      },
      {
        name: 'Hadash',
        description: 'Hadash is a left-wing political party in Israel.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb4sUQVgz0jYUn4L-UIVyBsFLhC3zVyZBs8A&s'
      },
      {
        name: 'Balad',
        description: 'Balad is an Arab political party in Israel.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnQ5QF2jiRL9ZwObvsF8-RMqqm8CRuosb-ZQ&s'
      },
      {
        name: 'Ta\'al',
        description: 'Ta\'al is an Arab political party in Israel.',
        imageUrl: 'https://www.idi.org.il/media/18310/%D7%97%D7%93-%D7%A9_%D7%AA%D7%A2-%D7%9C_%D7%9C%D7%95%D7%92%D7%95_2019.png?mode=crop&width=259&height=169'
      },
      {
        name: 'United Arab List',
        description: 'United Arab List is an Arab political party in Israel.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNOmYKjT-cgfmn8Yv9A1QMaV3Md_1asRBtNA&s'
      },
      {
        name: 'Kulanu',
        description: 'Kulanu is a centrist political party in Israel.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO8Q1t4SlozMUZ4Wrp5gWgaOzaWv3U3uG6YQ&s'
      },
      {
        name: 'Gesher',
        description: 'Gesher is a centrist political party in Israel.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9UjFJsHlLynVIxoLKqKipIhYgywZnBezgwQ&s'
      }
    ];
  }
}
