import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/common/services/common.service';
import { CustomService } from 'src/app/common/services/custom.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  isLoading = 0;
  addBlogForm: FormGroup;
  descriptionEditor = ClassicEditor;
  isSubmitted = 0;
  blogInfo = {
    id: "",
    title: "",
    description: "",
    blogCategories: []
  };
  dropdownList = [
    
  ];
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'category_name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    // itemsShowLimit: NULL,
    allowSearchFilter: true
};
  selectedCategoriesItems= [];
  params  = {
    slug: ""
  };
  config = { 
    toolbar: [ 'heading', '|', 'bold', 'italic','link', 'blockQuote','insertHtmlEmbed'] 
  }; 
  constructor(
    public commonService: CommonService,
    protected customService: CustomService,
    private router: Router,
    private route:ActivatedRoute,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  
  ngOnInit() {
    this.isLoading = 1;

    const params = this.route.paramMap.subscribe(params => {
      this.params.slug = params.get("slug");
    });

    this.setForm();
    this.getAllCategories();


  }

  get f() {
    return this.addBlogForm.controls;
  }

  setForm() {

    this.addBlogForm = this.formBuilder.group({
      title: [this.blogInfo.title,[Validators.required]],
      description: [this.blogInfo.description, [Validators.required]],
      blogCategories: [this.selectedCategoriesItems,[Validators.required]]
    });
 
  }

  onItemSelect(event)
  {
    console.log(event);
  }

  getAndSetBlogInfo() {
    this.isLoading = 1;
    this.customService.getBlogDetail({ slug: this.params.slug }).subscribe((result) => {
      if (result.status) {
         this.blogInfo.id = result.result.blogInfo.id;
          this.addBlogForm.controls.title.setValue(result.result.blogInfo.title);
          this.addBlogForm.controls.description.setValue(result.result.blogInfo.description);
          this.selectedCategoriesItems = result.result.blogInfo.blog_categories;
          
          let catArray = [];
          this.selectedCategoriesItems.forEach(element => {
            catArray.push({'id' :  element.category_id, "category_name" : element.category_name  });
          });
          

          this.addBlogForm.patchValue({
            blogCategories: catArray
          });
      }
      this.isLoading = 0;
    });
  }

  /**************************** Apis *************************** */

  onSubmit() {

    this.isSubmitted = 1;

    console.log(this.addBlogForm.controls.blogCategories.value);
    var blogCategories= this.addBlogForm.controls.blogCategories.value.map(function (value, index, array) {
      return  value.id ; 
    });

    let data = {
      id: this.blogInfo.id,
      title : this.f.title.value,
      description : this.f.description.value,
      blogCategories : blogCategories,
    }


    if (this.addBlogForm.invalid) {
      return;
    }
    this.customService.storeAndUpdateBlogDetail(data).subscribe(
      (result) => {
        if (result.status) {
          this.toastrService.success(result.message);
          this.router.navigate(['/']);
        }
        else {
          this.toastrService.error(result.message);
          this.isSubmitted = 0;
          this.isLoading = 0;
        }
      });
  }
  
  getAllCategories()
  {
    this.customService.getAllCategories({}).subscribe(
      (result) => {
        if (result.status) {
          this.dropdownList = result.result.categories;
          this.getAndSetBlogInfo();

        }
      });
  }

}


