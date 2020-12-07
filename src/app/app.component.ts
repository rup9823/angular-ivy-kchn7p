import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  VERSION,
  ViewChildren
} from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
var orderId = 10000;
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  name = "Angular " + VERSION.major;
  addForm: FormGroup;
  items = new Array();
  edit_order_id: Number;
  @ViewChildren("items") products: QueryList<ElementRef>;
  constructor(private formBuilder: FormBuilder) {
    this.addForm = formBuilder.group({
      item: new FormControl(),
      price: new FormControl(),
      quantity: new FormControl()
    });
  }

  ngOnInit(): void {}
  addData() {
    let quantity = this.addForm.value.quantity;
    let price = this.addForm.value.price;
    let total = quantity * price;
    this.items.push({
      date: new Date(),
      orderId: orderId--,
      itemName: this.addForm.value.item,
      price: price,
      quantity: quantity,
      total: total
    });
    this.addForm.reset();
    console.log(this.items);
  }
  editData() {
    let obj = this.items.find(x => x.orderId === this.edit_order_id);
    let index = this.items.indexOf(obj);
    let quantity = this.addForm.value.quantity;
    let price = this.addForm.value.price;
    let total = quantity * price;
    let itemName = this.addForm.value.item;
    let new_obj = {
      date: new Date(),
      orderId: this.edit_order_id,
      itemName: this.addForm.value.item,
      price: price,
      quantity: quantity,
      total: total
    };
    console.log(new_obj);
    this.items[index] = new_obj;
    console.log(this.items);
  }
  edit_id(items, i) {
    this.edit_order_id = i.orderId;
    this.addForm.setValue({
      item: i.itemName,
      price: i.price,
      quantity: i.quantity
    });
  }
}
