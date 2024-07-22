import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
declare var document: any;
@Component({
  selector: 'app-maklumbalas',
  templateUrl: './maklumbalas.page.html',
  styleUrls: ['./maklumbalas.page.scss'],
})
export class MaklumbalasPage implements OnInit {
  public title: string = 'Borang Maklumbalas';
  public feedbackForm: any = FormGroup;
  @ViewChild('imageUpload') imageUploadRef!: ElementRef;
  private file: any;
  public filename: any = '';
  public file_view: any;
  public showKeterangan: boolean = false;
  public detail: string = '';
  constructor(
    public formBuilder: FormBuilder,
    public apiService: ApiService
  ) { }

  ngOnInit() {
    this.feedbackForm = this.formBuilder.group({
      nama: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      kategori: [''],
      tel: ['', Validators.compose([Validators.pattern('^(01)[0-46-9]*[0-9]{7,8}$'), Validators.required])],
      feedback: [''],
      image_url: [''],
      keterangan: ['']
    });
    // Validators.pattern('^(\+?6?01)[02-46-9]-*[0-9]{7}$|^(\+?6?01)[1]-*[0-9]{8}$')
  }

  onFileChanged(event: any){
    this.file = event.target.files[0];
    this.filename = this.file.name;
    console.log('File info ==> ', this.file);
    const type = this.file.type;
    const ext = this.filename.slice((this.filename.lastIndexOf('.') - 1 >>> 0)+2);
    const position = type.search("image");
    if(position >=0){
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (event: any) => {
        this.file_view = event.target.result;
        console.log('File Result: ', this.file_view, 'Filename: ', this.filename);
      };
      reader.onerror = (error: any) => {
        console.log('Error: ', error);
      };
    }
  }

  uploadImage(){
    this.imageUploadRef.nativeElement.click();
  }

  async submitFeedback(){
    console.log(this.feedbackForm.value);

    if(this.file_view) {
      const image: any = await this.submitImage();
      this.feedbackForm.value.image_url = image.image_path;
    }

    let dataKategori = JSON.stringify(this.feedbackForm.value.kategori);
    this.feedbackForm.value.kategori = dataKategori;

    try {
      const response: any = await this.apiService.doPost('/maklumbalas', this.feedbackForm.value);
      console.log('response ==> ', response.message);
    } catch (error: any) {
      console.log('Error ==> ', error.message);
    }
  
  }

  setKategori(event: any){
    this.showKeterangan = false;
    let selectedKategori = event.detail.value;
    this.feedbackForm.value.keterangan = '';
    this.detail = '';
    for(let item of selectedKategori){
      if(item == "Lain-lain"){
        this.showKeterangan = true;
        break;
      } 
    }
    // let data = JSON.stringify(event.detail.value);
    // this.feedbackForm.value.kategori = data;
    // console.log(this.feedbackForm.value.kategori);
    //to do: check lain-lain data and enable field Lain-Lain input if user tick lain-lain
  }

  async submitImage(){
    let formData = new FormData();
    formData.append('upload', this.file);
    const response: any = await this.apiService.doPost('/upload/no_token', formData, true);
    return await response;
  }

}
