import Notiflix from 'notiflix';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ROUTING_NAME } from '../../utils/routing';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { manifold as dummyManifold, machine as dummyMachine} from '../../pages/controls/dummydata';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  // tabs label and path
  public manifoldTabs = [
    { label: 'Overview', selected: false, path: ROUTING_NAME.CONTROLS },
    { label: 'Tests Config', selected: false, path: ROUTING_NAME.TESTS },
    { label: 'Config Settings', selected: false, path: ROUTING_NAME.SETTINGS }
  ];

  constructor( private authService: AuthService, private router: Router){ }

  /**
   * Function to handle the logout by clearing storage and redirecting to login page
   */
  logout(): void{
    localStorage.clear();
    this.router.navigate(['/login']);
    Notiflix.Notify.success('Log out successfully!');
  }

  /**
   * Function to check if the user is logged in
   */
  get tokenFromLocalStorage(){
    return this.authService.isLoggedIn()?  false: true 
  }

  /**
   * Get function get data from service and return the machine mac address
   */
  public get machineMac(): string {
    // return this.machineService.machine?.mac;
    return dummyMachine?.mac;
  }

  /**
   * Get function to get data from service and return the manifold mac address 
   */
  public get manifoldMac(): string {
    // return this.machineService.manifold?.mac;
    return dummyManifold?.mac;
  }

  /**
   * this function checks that pressure and temperature data available or not 
   * @param tab tab name
   */
  checkTemperatureFlow(tab: string){
    if(tab == 'Charts' ){
      // return this.machineService.manifold?.channels.length > 1? false: true;
      return dummyManifold?.channels.length > 1? false: true;
    }
    return false
  }

  /**
   * Redirects the user to the mould settings this is also the landing page as well.
   */
  redirectToMouldSettings(): void {
    alert()
    this.router.navigate(['/mould']);
  }


}
