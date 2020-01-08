import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  inventoryData: any=[];
  blockData: any=[];
  varietyData: any=[];
  databaseObj: SQLiteObject; // Database instance object
  row_data: any = []; // Table rows
  readonly database_name:string = "fillco_flowers.db"; // DB name
  readonly table_inventory:string = "inventory"; //
  readonly table_block:string = "block"; //
  readonly table_variety:string = "variety"; //
  //

  constructor(private platform: Platform,private authService: AuthenticationService,
    private sqlite: SQLite,public apiService: ApiService) {
  }

  ngOnInit() {

    this.createDB();
    this.getBlocks();
    this.getVariety();
    this.getInventory();


  }

  logout() {
    this.authService.logout();
  }
  download()
  {
    var spnr =document.getElementById('spnr');
    // @ts-ignore
    spnr.style="display:block";

    //delete all rows
    // @ts-ignore
    setTimeout( this.deleteTable(this.table_inventory), 1000);
    // @ts-ignore
    setTimeout( this.deleteTable(this.table_variety), 1000);
    // @ts-ignore
    setTimeout( this.deleteTable(this.table_block), 1000);

    // @ts-ignore
    setTimeout( this.getBlocks(), 1000);
    // @ts-ignore
    setTimeout( this.getVariety(), 1000);
    // @ts-ignore
    setTimeout( this.getInventory(), 1000);

    // @ts-ignore
    setTimeout( this.insertBlock(), 1000);
    // @ts-ignore
    setTimeout( this.insertVariety(), 1000);
    // @ts-ignore
    setTimeout( this.insertInventory(), 1000);

    setTimeout( function () {
      alert("Se actualizó la información de manera satisfactoria!!");
      // @ts-ignore
      spnr.style="display:none";
    }, 10000);


  }
  inform()
  {
    console.log("Going to inform module...");
  }
  createDB() {
    //alert("ingresando a createDB");
    this.sqlite.create({
      name: this.database_name,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        //alert(this.database_name +' Database Created!');
        // @ts-ignore
        setTimeout(this.createTableBlock(), 1000);
        // @ts-ignore
        setTimeout(this.createTableVariety(), 1000);
        // @ts-ignore
        setTimeout(this.createTableInventory(), 1000);
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });


  }
  createTableBlock() {
    //alert("ingresando a createTableBlock");
    this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_block + ' (id_bloque varchar(255),nombre varchar(255),codigo varchar(255))', [])
      .then(() => {
        //alert('Table Block Created!');
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  createTableInventory() {
    //alert("ingressando a createTableInventory");

    this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_inventory + ' (fecha_calidad varchar(255),' +
        'codigo_variedad varchar(255),variedad varchar(255),cod_bloque varchar(255),numero_tallos varchar(255),' +
        'plants_numbers varchar(255),squars_meters varchar(255),prod_planta varchar(255),prod_mtrs varchar(255))', [])
        .then(() => {
          //alert('Table Inventory Created!');

        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
  }
  createTableVariety() {
    //alert("ingressando a createTableVariety");
    this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_variety + ' (codigo_variedad varchar(255),nombre varchar(255))', [])
        .then(() => {
          //alert('Table Variety Created!');
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
   }
  getBlocks()
  {

    this.apiService.getBlocks().subscribe(
        response => {
          this.blockData = response['data'];
        },
        error => {
          alert('Se produjo un error al consumir el servicio');
        });
  }

  insertBlock() {

    //alert("block "+this.blockData.length);

    for (var i = 0; i < this.blockData.length; i++) {


      var id_bloque=this.blockData[i].id_bloque;
      var nombre=this.blockData[i].nombre;
      var codigo=this.blockData[i].codigo;


      this.databaseObj.executeSql('INSERT INTO ' + this.table_block + ' (id_bloque,nombre,codigo) VALUES ("' + id_bloque + '","' + nombre + '","' + codigo + '")', [])
          .then(() => {

          })
          .catch(e => {
            alert("error " + JSON.stringify(e))
          });
    }


  }
  getVariety()
  {

    this.apiService.getVariety().subscribe(response => {
      this.varietyData = response['data'];
      //alert(this.varietyData.length);
    })
  }

  insertVariety() {
    //alert("variety" +this.varietyData.length);
    for (var i = 0; i < this.varietyData.length; i++) {
      var codigo_variedad=this.varietyData[i].codigo_variedad;
      var nombre=this.varietyData[i].nombre;

      this.databaseObj.executeSql('INSERT INTO ' + this.table_variety + ' (codigo_variedad,nombre) VALUES ("' + codigo_variedad + '","' + nombre + '")', [])
          .then(() => {

          })
          .catch(e => {
            alert("error " + JSON.stringify(e))
          });
    }
  }
  getInventory()
  {

    this.apiService.getList().subscribe(response => {
      this.inventoryData = response['data'];

    })
  }
  
  insertInventory() {
   //alert("inventory"+this.inventoryData.lengthf);

    for (var i = 0; i < this.inventoryData.length; i++) {

      var fecha_calidad=this.inventoryData[i].fecha_calidad;
      var codigo_variedad=this.inventoryData[i].codigo_variedad;
      var variedad=this.inventoryData[i].variedad;
      var cod_bloque=this.inventoryData[i].cod_bloque;
      var numero_tallos=this.inventoryData[i].numero_tallos;
      var plants_numbers=this.inventoryData[i].plants_numbers;
      var squars_meters=this.inventoryData[i].squars_meters;
      var prod_planta=this.inventoryData[i].prod_planta;
      var prod_mtrs=this.inventoryData[i].prod_mtrs;

      var sql="INSERT INTO "+this.table_inventory+" (fecha_calidad,codigo_variedad,variedad,cod_bloque,numero_tallos,plants_numbers,squars_meters,prod_planta,prod_mtrs) VALUES ('"+fecha_calidad+"','"+codigo_variedad+"','"+variedad+"'," +
          "'"+cod_bloque+"','"+numero_tallos+"','"+plants_numbers+"','"+squars_meters+"','"+prod_planta+"','"+prod_mtrs+"');";

      this.databaseObj.executeSql(sql, [])
      .then(() => {

      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
    }
  }

  deleteTable(table:string)
  {
    var sql="DELETE FROM "+table;

    this.databaseObj.executeSql(sql, [])
        .then(() => {
       // alert("row deletes of table "+table);
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
  }
}
