import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import htmlToImage from 'html-to-image';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  date = null;
  loading = false;
  itemData: Array<any> = [];
  header: any;
  subtotal: any;
  printimage: any;
  message = 'Please select date to view invoice';
  taxes: Array<any> = [];
  constructor(private appService: AppService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getTax();
  }

  getTax() {
    this.appService.getActiveTaxes().subscribe(u => {
      this.taxes = u;
    });
  }


  onChange(result: Date): void {
    this.loading = true;
    if (!this.date) {
      this.printimage = null;
    } else {
      this.appService.getInvoice({date: this.date}).subscribe(u => {
        console.log(u);
        if (u.result === 100) {
          this.header = u.data;
          this.itemData = u.data.items;
          setTimeout(() => {
            const mydata = document.getElementById('invoice-item');
            htmlToImage.toJpeg(mydata)
              .then(async dataUrl => {
                this.printimage = this.sanitizer.bypassSecurityTrustResourceUrl(dataUrl);
                this.header.file = dataUrl;
                console.log(this.header);
                this.appService.sendInvoice(this.header).subscribe(m => {
                  if (m.result !== 100) {
                    this.date = null;
                    this.message = u.message;
                  }
                });
              })
              .catch((error) => {
                console.error('oops, something went wrong!', error);
              });
          }, 3000);
        } else {
          this.date = null;
          this.message = u.message;
        }
        this.loading = false;
      });
      console.log('onChange: ', result);
    }
  }

  calcuSub() {
    this.subtotal = 0.0;
    this.itemData.forEach(u => {
      this.subtotal = parseFloat(u.quantity) * parseFloat(u.unitCost);
    });

    return this.subtotal;
  }

  calcTax(item) {
    return parseFloat(item) / 100 * parseFloat(this.subtotal);
  }

  calcTotal() {
    let tax = 0;

    this.taxes.forEach(u => {
      tax = parseFloat(String(tax)) + parseFloat(u.percentage) / 100 * parseFloat(this.subtotal);
    });

    return parseFloat(this.subtotal) + parseFloat(String(tax));
  }
}
