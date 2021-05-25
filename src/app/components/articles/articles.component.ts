import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  oneArticles:any;
  oneComment:any
  Comment:any[]=[];
  articleId: any;
  profileForm!:FormGroup;

  getUrl()
  {
    return "url('../../../assets/images/header-bg.jpg')";
  }

  constructor(private http : HttpClient , private router : Router , private activatedRoute: ActivatedRoute , private _formBuilder: FormBuilder ) {
    this.activatedRoute.queryParams.subscribe(params => {
      let id = params['id'];
      this.articleId = id;
    });
   }

  getOneArticle(id:string){
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    return this.http.get(url
      ).subscribe(data=>{
        this.oneArticles = data;
        console.log(this.oneArticles)
      })
  }


  getComments(id:string){
    let url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;
    return this.http.get(url
      ).subscribe(data=>{
        this.oneComment = data;
        console.log(this.oneComment)
      })
  }

  postComments(){
    let url = `https://jsonplaceholder.typicode.com/posts`;
      let thisComment : any = {};
      thisComment.comment = this.profileForm.get('comment')?.value
      thisComment.name = this.profileForm.get('name')?.value
      thisComment.email = this.profileForm.get('email')?.value
      
      this.Comment.push(thisComment)
      console.log(this.Comment);
      
  }

  ngOnInit(): void {
    console.log(this.getOneArticle(this.articleId))    
    console.log(this.getComments(this.articleId));



     this.profileForm = this._formBuilder.group({
      comment: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
    });
    
  }

  onSubmit() {
    console.warn(this.profileForm.value);
    console.log(this.postComments);
    
  }

}
