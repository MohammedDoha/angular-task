import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  
})
export class HomeComponent implements OnInit {
  
  constructor(private http : HttpClient , private router : Router) { }

  allArticles:any;
  limitedArticles:any;

  sliderOne:any;
  sliderTwo:any;

  getUrl()
{
  return "url('../../../assets/images/header-bg.jpg')";
}

  getAllArticles(){
    let url = "https://jsonplaceholder.typicode.com/posts";
    return this.http.get(url
    ).subscribe(data=>{
      this.allArticles = data;
      
      this.limitedArticles = (this.allArticles as any[]).slice(0,10);
      
      console.log("the old" , this.allArticles, )
      console.log("the new", this.limitedArticles)
    })
  }

  topSlider(){
    let url = "https://jsonplaceholder.typicode.com/posts";
    return this.http.get(url
    ).subscribe(data=>{
      this.sliderOne = data;
      
      this.sliderTwo = (this.sliderOne as any[]).slice(0,5);
      
      console.log("the old" , this.sliderOne, )
      console.log("the new", this.sliderTwo)
    })
  }

  


  viewArticleDetails(id:any){
    this.router.navigate(['/article'], { queryParams: { id: JSON.stringify(id)}});
  }

  ngOnInit(): void {
    this.getAllArticles();
    this.topSlider();
  }

}
