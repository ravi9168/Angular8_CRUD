import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Lookup } from '../models/lookup';
import { LookupService } from '../services/lookup.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {


  private observableSubscription:Array<Subscription> = [];
  formSubmitted = false;
  productForm = this.fb.group({});
  units:Observable<Lookup[]>;
  categories:Observable<Lookup[]>;
 

  constructor(private fb:FormBuilder,
    private lookupService:LookupService,
    private productService:ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.productForm.addControl('id', new FormControl("", [Validators.required]));
    this.productForm.addControl('name', new FormControl("", [Validators.required]));
    this.productForm.addControl('code', new FormControl("", [Validators.required]));
    this.productForm.addControl('unit', new FormControl("", [Validators.required]));
    this.productForm.addControl('category', new FormControl("", [Validators.required]));
    this.productForm.addControl('salesRate', new FormControl("", [Validators.required]));
    this.productForm.addControl('purchaseRate', new FormControl("", [Validators.required]));
    this.units = this.lookupService.getUnits();
    this.categories = this.lookupService.getProductCategories();
  }


  save($event:any):void{

    this.formSubmitted = true;
    if(!this.productForm.valid){
      return;
    }

    this.saveProduct();

    // navigate back to products list
    this.router.navigate(['/products']);
  }

  saveAndContinue($event:any):void{
    this.formSubmitted = true;
    console.log(this.productForm.get('name').errors);
    if(!this.productForm.valid){
      return;
    }

    this.saveProduct();


  }

  saveProduct():void{
    const product =new Product();
    // map data from form to product
    product.id = this.productForm.get('id').value;
    product.name = this.productForm.get('name').value;
    product.code = this.productForm.get('code').value;
    product.category = this.getLookupObjFromCode(this.productForm.get('category').value);
    product.unit =  this.getLookupObjFromCode(this.productForm.get('unit').value);
    product.purchaseRate =  this.productForm.get('purchaseRate').value;
    product.salesRate = this.productForm.get('salesRate').value;

    // save to database
    if(product.id == 0){
      this.productService.addNewProduct(product);}
      else {
        this.productService.updateProduct(product);
      }
  }

  getLookupObjFromCode(code:string):Lookup{
    var lookup:Lookup = null;
    const subscription = this.units.subscribe(lookups => {
      lookup  = lookups.find(item => item.code == code)
    })
    subscription.unsubscribe();
    return lookup;
  }



}
