import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  listProduct: Product[] = []

  constructor(private _productService:ProductService, private toastr:ToastrService){}

  ngOnInit(): void{
    this.getProducts()
  }

  getProducts(){
    this._productService.getProducts().subscribe(data =>{
      console.log("data:", data)
      this.listProduct = data;
    })
  }

  deleteProduct(id:number){
    this._productService.deleteProduct(id).subscribe(()=>{
      this.getProducts();
      this.toastr.warning('El producto fue eliminado con exito', 'Producto eliminado');
    })
  }
}
