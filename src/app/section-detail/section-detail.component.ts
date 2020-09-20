import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../news.service';


import 'rxjs/Rx';
import{SectionNewsComponent} from '../section-news/section-news.component';

import {MatDialog} from '@angular/material';
export interface DialogData {
  format: string;
  url: string;
}


@Component({
  selector: 'app-section-detail',
  templateUrl: './section-detail.component.html',
  styleUrls: ['./section-detail.component.scss']
})


export class SectionDetailComponent implements OnInit {
  date; //date Variable
  logedInForm; //These are variables
  emailId;
  password;
  display='none'; //default Variable
  public sectionName: string;
  public subsection:string;
  public sectionNewsRaw: any;
  public sectionNewsResultSection:any;
  public SectionNews: any;
  public  urlSegment:any;
  public subSectionretr: any;
  public sectionNewsResult:any;
  public sectionNewsOrdinary:any;
  public topStories:any;
  public sex:any;
  public count:number;
  public subsection1:any;
  @Input() uniqueSubsections:string;
  @Input() subSectionretrx:any;
  @Input() subsectionx:any;
  formated: string;
  link: string;
  dialogResult: '';

 
  constructor(private route: ActivatedRoute, private _newsService: NewsService, public dialog:MatDialog,private router:Router) {
    console.log('constructor of sectionDetail:' + new Date().toTimeString());
   
  }
  ngOnInit() {
    

    console.log(this.subsectionx);
    console.log('ngonit of sectionDetail:' + new Date().toTimeString());
    // console.log(this.route.snapshot.url[2].path);


    //console.log(this.uniqueSubsections);

    // this.sex= this.route.snapshot.paramMap.get('sectionName');
    // console.log(this.sex);
    // this.route.paramMap.subscribe(params => {
     console.log(this.route.snapshot.paramMap.getAll('sectionName'));
     console.log(this.route.snapshot.paramMap.keys)
     console.log(this.route.snapshot.paramMap.has('sectionName'));
    this.route.paramMap.subscribe(paramsroot =>{
      this.sectionName = paramsroot.get('sectionName');
      console.log(this.sectionName)
      // console.log(this.route.firstChild);
      // console.log(this.route.firstChild.params);
      // console.log(this.route.firstChild.pathFromRoot);
      //if (this.route.firstChild.paramMap != null) {
        console.log(paramsroot);
      //}

      this.route.paramMap.subscribe(paramsroot =>{
        this.subsection = paramsroot.get('subsection');
        console.log(this.subsection)// Print the parameter to the console.
    });

    // this.route.paramMap.subscribe(params => {
    //   console.log(params)
      //this.subSectionretr = params.get('subsection');
      this.subsectionx = null;

      this._newsService.getSectionNews(this.sectionName)
        .subscribe(
          data => {
            this.sectionNewsRaw = data;
            this.sectionNewsResultSection = this.sectionNewsRaw.results.section;
            this.sectionNewsResult=this.sectionNewsRaw.results;
            for( var i=2; i<=this.count ;i++){
              this.sectionNewsOrdinary[i]=this.sectionNewsResult[i];
           

            }
            for(var i=0; i<=1; i++){
              this.topStories = this.sectionNewsResult[i];
            }
            console.log(this.topStories.section);
            console.log(this.sectionNewsOrdinary);
            this.count=this.sectionNewsRaw.num_results;
           

            // console.log(this.sectionNewsRaw);
            // console.log(this.sectionNewsRaw.results);
            //console.log(this.sectionNewsRaw.results);
            //this.SectionNews=this.sectionNewsRaw.results;
          });
    // });
  });




  this._newsService.subsection1.subscribe(subsection1 => this.subsection1 = subsection1);

  }

  doSomething(){
    this.subsectionx="";
    console.log(this.subsectionx);
   }

  openDialog(multimedia) {
    console.log(multimedia)
      let dialogREf = this.dialog.open(SectionNewsComponent,{
        height: '100%',
        data: { multimedia: multimedia},
        // console.log(data[0].formated)
        // data: { caption:caption, url:url},
        width: '100%',

      },);
      dialogREf.afterClosed().subscribe(result =>{
        console.log(`Dialog closed: ${result}`);
        this.dialogResult = result;
      })
  }
}


