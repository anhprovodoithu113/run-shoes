import { Component, Inject } from '@angular/core';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Run Shoes';

  faFacebook = faFacebook;
  faYouTube = faYoutube;
  faInstagram = faInstagram;

}
