import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  databaseObj: SQLiteObject; // Database instance object
  readonly database_name:string = "users.db"; // DB name
  readonly table_name:string = "users";
  row_data: any = []; // Table rows
  nombre: string='';
  apellido: string='';
  correo: string='';
  password:string='';

  //
  constructor(private platform: Platform,private sqlite: SQLite) {

      this.platform.ready().then(() => {
          this.createDB();
          this.createTable();
      }).catch(error => {
          console.log(error);
      })
  }

  ngOnInit() {
  }
  createDB() {
    this.sqlite.create({
      name: this.database_name,
      location: 'default'
    })
        .then((db: SQLiteObject) => {
          this.databaseObj = db;

        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
  }
  createTable() {
    this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_name + ' (nombre varchar(255),apellido varchar(255),correo varchar(255),password varchar(255))', [])
        .then(() => {

        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
  }
  register()
  {

     if(this.nombre!=="" && this.apellido!=="" && this.correo!=="" && this.password!=="")
     {
         // @ts-ignore
         setTimeout( this.createDB(), 1000);
         // @ts-ignore
         setTimeout( this.createTable(), 1000);

         this.databaseObj.executeSql('INSERT INTO ' + this.table_name + ' (nombre,apellido,correo,password) VALUES ("' + this.nombre + '","' + this.apellido + '","' + this.correo + '","' + this.password + '")', [])
             .then(() => {
                 alert('Usuario registrado');
             })
             .catch(e => {
                 alert("error " + JSON.stringify(e))
             });
     }else
     {
         alert("Introduzca los datos de nombre, apellido, correo y password");
     }
  }


}
