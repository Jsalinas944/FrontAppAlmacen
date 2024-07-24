import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent {

  form: FormGroup;
  id: number;
  tipoDeOperacion:string = 'Agregar ';
  constructor(private fb: FormBuilder, private _productService:ProductService,private router:Router, private toastr:ToastrService, private aRouter:ActivatedRoute){
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [null, Validators.required],
      stock: [null, Validators.required],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {

    if (this.id != 0) {
      // Es editar
      this.tipoDeOperacion = 'Editar ';
      this.getOneProduct(this.id);
    }
  }

  getOneProduct(id:number){
    this._productService.getOneProduct(id).subscribe((data: Product) =>{
      console.log(data);
      this.form.setValue({
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        stock: data.stock
      })
    })
  }

  addProduct() {
    const product: Product = {
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      precio: this.form.value.precio,
      stock: this.form.value.stock
    }
    if(this.id !==0){
      //Editar
      product.id = this.id;
      this._productService.updateProduct(this.id, product).subscribe(() => {
        this.toastr.info(`El producto ${product.nombre} fue actualizado con exito`, 'Producto actualizado');
        this.router.navigate(['/dashboard']);
      })
    }else{
      //Agregar
      this._productService.saveProduct(product).subscribe(() =>{
        this.toastr.success(`El producto ${product.nombre} fue registrado con exito`, 'Producto registrado');
        this.router.navigate(['/dashboard']);
      })
    }
  }
}
