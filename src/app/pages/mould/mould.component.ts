import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { float, int } from '@zxing/library/esm/customTypings';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-mould',
  standalone: true,
  imports: [CommonModule, NgxSliderModule, FormsModule],
  templateUrl: './mould.component.html',
  styleUrl: './mould.component.scss'
})
export class MouldComponent {

  isCommentSidebarVisible: boolean = false; // To store value for side bar container
  testSaved: boolean = false; // To store value for test saved or not
  commentText: string = ''; // To store value for comment text
  clickedRun: number = 1
  pressureSetRange: string[] = Array.from({ length: 501 }, (_, i) => (i * 0.01).toFixed(2));
  selectedPressureValue: string
  selectedTempValue: string
  value: float = 40.0;
  highValue: float = 60.0;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 0.1,
  };
  stepperData = new_moud
  stepper: Stepper | undefined;
  
  ngAfterViewInit(): void {
    this.stepper = new Stepper(document.querySelector('.bs-stepper')!, {
      linear: false,
      animation: true,
    });
  }
  constructor(private readonly router: Router){
    this.newMouldSchema()    
    this.pressuerTempRange() // Set range for pressure set values and temperature set values 
  }

  nextStep(): void {
    this.stepper?.next();
  }

  previousStep(): void {
    this.stepper?.previous();
  }

  pressuerTempRange(){
    this.selectedPressureValue = this.stepperData.pressure_set_point
    this.selectedTempValue = this.stepperData.temperature_set_point
  }

  /**
   * Set value for enable all based on that specific run 
   * Set true if all channels are enabled
   */
  newMouldSchema(){
    this.stepperData.runs = this.stepperData.runs.map(run =>{
      const allChannelsEnabled = run.connection.every(channel => channel.channel_enable === true);
      return {
        ...run,
        enable_all: allChannelsEnabled
      };
    })
  }

  // Show and hide side bar for comment section
  toggleCommentSideBar(): void {
    this.isCommentSidebarVisible = !this.isCommentSidebarVisible;
  }


  /**
   * Add new run to the schema
   */
  addRun(){
    const newRun = {
      run_id:this.stepperData.runs.length +1,
      pressure_set_point: 3,   
      temperature_set_point: 3,
      connection:[
        { channel_id: 1, channel_name: "channel", channel_low_limit: 30, channel_upper_limit: 90, channel_enable: true, channel_diameter: 'circle' },
        { channel_id: 2, channel_name: "channel", channel_low_limit: 30, channel_upper_limit: 90, channel_enable: false, channel_diameter: 'square' },
        { channel_id: 3, channel_name: "channel", channel_low_limit: 30, channel_upper_limit: 90, channel_enable: true, channel_diameter: 'circle' },
        { channel_id: 4, channel_name: "channel", channel_low_limit: 30, channel_upper_limit: 90, channel_enable: true, channel_diameter: 'square' },
        { channel_id: 5, channel_name: "channel", channel_low_limit: 30, channel_upper_limit: 90, channel_enable: false, channel_diameter: 'circle' },
        { channel_id: 6, channel_name: "channel", channel_low_limit: 30, channel_upper_limit: 90, channel_enable: true, channel_diameter: 'circle' },
        { channel_id: 7, channel_name: "channel", channel_low_limit: 30, channel_upper_limit: 90, channel_enable: true, channel_diameter: 'square' },
        { channel_id: 8, channel_name: "channel", channel_low_limit: 30, channel_upper_limit: 90, channel_enable: true, channel_diameter: 'circle' },
        { channel_id: 9, channel_name: "channel", channel_low_limit: 30, channel_upper_limit: 90, channel_enable: false, channel_diameter: 'circle' },
        { channel_id: 10, channel_name: "channel", channel_low_limit:30, channel_upper_limit: 80, channel_enable: true, channel_diameter: 'circle' },
        { channel_id: 11, channel_name: "channel", channel_low_limit:30, channel_upper_limit: 80, channel_enable: true, channel_diameter: 'square' },
        { channel_id: 12, channel_name: "channel", channel_low_limit:30, channel_upper_limit: 80, channel_enable: true, channel_diameter: 'circle' },
      ],
      enable_all: false
    }
    this.stepperData.runs.push(newRun)
  }

  /**
   * verify that current run is last run and number of runs is more then 1 
   * @param runId id of the current run
   * @param runLength total sidze of run
   * @returns class to show cross button  
   */
  checkLastRun(runId:int, runLength:int){
    let classesToSet = ''
    classesToSet = ((runLength > 1) && (runId == runLength))? 'lastBTN': '' // To show cross button on last run 
    classesToSet += this.clickedRun == runId ? ' active' : ''  // Set color blue if tab is selected
    return classesToSet
  }

  /**
   * Remove the last run if not needed
   * @param runId Id of the run to remove
   */
  removeLastRun(runId: number){
    if (runId == this.clickedRun)
      this.clickedRun = this.clickedRun - 1
    this.stepperData.runs = this.stepperData.runs.filter(item => item.run_id !== runId);
  }


  /**
   * Change tabs of the runs based on the button action previous/next 
   * @param buttonAction  previous/next 
   */
  onTabChange(buttonAction: string){
    if (buttonAction === 'next'){
      this.clickedRun = this.clickedRun == this.stepperData.runs.length ? this.clickedRun :this.clickedRun + 1
    } else {
      this.clickedRun = this.clickedRun == 1 ? this.clickedRun :this.clickedRun - 1
    }
  }

  /**
   * Change the value of pressure and temperature set points and update the local schema
   * @param event to get the selected values
   * @param type to check if the value is for pressure or temperature
   */
  onPressureTempChange(event: Event, type: string){
    const value = (event.target as HTMLInputElement).value
    if (type === 'pressure'){
      this.selectedPressureValue = value
      this.stepperData.pressure_set_point = value
    } else {
      this.selectedTempValue = value
      this.stepperData.temperature_set_point = value
    }

  }

  /**
   * Update the schema of new settings to the backend based on the button action
   * @param btnAction  save/cancel
   */
  saveBtnUpdateSchema(btnAction: string){
    const that = this
    Notiflix.Confirm.show(
      'Confirm',
      'Do you want to save mould settings?',
      'Yes',
      'No',
      function okCb() {
        if (btnAction === 'save'){
          // Save the schema to the backend

          // Logic ---------- waiting for api ----------
            // 1. Store the this.stepperData in database
          that.testSaved = true
          Notiflix.Notify.success('Mould settings saved successfully');
        }
      },
      function cancelCb() { }
    );
  }

  /**
   * Start the mould test and navigate to the test page after saving the schema to the backend
   */
  startMouldTest(){
    if(this.testSaved == false){
      Notiflix.Notify.info('Please save the mould settings first.');
    }
    else{
      const that = this
      Notiflix.Confirm.show(
        'Confirm',
        'Do you want to start mould test?',
        'Yes',
        'No',
        function okCb() {
          // Logic ---------- waiting for api ----------
          // 1. Start the mould test
          Notiflix.Notify.info('Select Mould to start the test.');
          that.router.navigate(['/tests']);
        },
        function cancelCb() { }
      );  
    }
  }

  /**
   * Update the schema of the new settings based on the element and input
   * @param element element to update 
   * @param input input value to update
   * @param data   
   */
  updateRunElement(element:string, input: any, data?: any){
    this.testSaved = false
    if(element === 'mould-id'){
      const mouldName = (input.target as HTMLInputElement).value
      this.stepperData.mould_name = mouldName
    }
    else if(element === 'slider'){
      this.stepperData.runs.forEach(run => {
        if(run.run_id === data.runId){
          run.connection.forEach(channel => {
            if(channel.channel_id === input.channel_id){
              channel.channel_low_limit = input.channel_low_limit
              channel.channel_upper_limit = input.channel_upper_limit
            }
          })
        }
      })
    }
    else if(element === 'channel-enable'){
      const isChecked = (input.target as HTMLInputElement).checked;
      this.stepperData.runs.forEach(run => {
        if(run.run_id === data.runId){
          run.connection.forEach(channel => {
            if(channel.channel_id === data.channelId){
              channel.channel_enable = isChecked
            }
          })
        }
      })
    }
    else if(element == 'enable-all'){
      const isChecked = (input.target as HTMLInputElement).checked;
      this.stepperData.runs.forEach(run => {
        if(run.run_id === data.runId){
          run.enable_all = isChecked
          run.connection.forEach(channel => {
            channel.channel_enable = isChecked
          })
        }
      })
    }
    else if(element == 'channel-diameter'){
      const diameter = (input.target as HTMLInputElement).value
      this.stepperData.runs.forEach(run => {
        if(run.run_id === data.runId){
          run.connection.forEach(channel => {
            if(channel.channel_id === data.channelId){
              channel.channel_diameter = diameter
            }
          })
        }
      })
    }
    else if(element == 'comment'){
      const comment = this.commentText
      this.stepperData.comment = comment
    }
  }

}
