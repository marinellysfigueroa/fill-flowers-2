import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-inform',
  templateUrl: './inform.page.html',
  styleUrls: ['./inform.page.scss'],
    providers: []
})
export class InformPage implements OnInit {
    databaseObj: SQLiteObject; // Database instance object
    inventoryData: any=[];
    blockData: any=[];
    varietyData: any=[];
    codigo_bloque: string;
    codigo_variedad: string;
    fecha_fin: string;
    fecha_inicio: string;
    readonly database_name:string = "fillco_flowers.db"; // DB name
    readonly table_inventory:string = "inventory"; //
    readonly table_block:string = "block"; //
    readonly table_variety:string = "variety"; //


  constructor(private platform: Platform,private authService: AuthenticationService,
              private sqlite: SQLite) {


  }


  ngOnInit() {
     // alert("estoy ingresando al init");

      this.codigo_bloque='ALL';
      this.codigo_variedad='ALL';
      this.getCurrentDate();
      this.createDB();


  }
  getCurrentDate()
  {
      var currentDate = new Date();
      var day = currentDate.getDate();
      var month_last = currentDate.getMonth() ;
      var month = currentDate.getMonth() + 1;
      var year = currentDate.getFullYear();

      this.fecha_fin=year+"-"+month+"-"+day;
          this.fecha_inicio=year+"-"+month_last+"-"+day;
  }
    createDB() {
       // alert("ingresando a openDB");
        this.sqlite.create({
            name: this.database_name,
            location: 'default'
        })
            .then((db: SQLiteObject) => {
                this.databaseObj = db;
                 this.createTableBlock();
                 this.createTableVariety();


            })
            .catch(e => {
                alert("error " + JSON.stringify(e))
            });

    }
    createTableBlock() {
        //alert("ingresando a createTableBlock");

        this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_block + ' (id_bloque varchar(255),nombre varchar(255),codigo varchar(255))', [])
            .then(() => {
                this.getBlock();
            })
            .catch(e => {
                alert("error " + JSON.stringify(e))
            });

    }
    createTableVariety() {
        //alert("ingressando a createTableVariety");
        this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_variety + ' (codigo_variedad varchar(255),nombre varchar(255))', [])
            .then(() => {
                this.getVariety();
            })
            .catch(e => {
                alert("error " + JSON.stringify(e))
            });


    }

  getInventory() {

      var spnr =document.getElementById('spnr-inf');
      var inform =document.getElementById('inform');

      // @ts-ignore
      spnr.style="display:block";
      // @ts-ignore
      inform.style="display:none";


      // alert(this.codigo_bloque+' '+this.codigo_variedad+' '+this.fecha_inicio+' '+this.fecha_fin);

      var sql="select cod_bloque,codigo_variedad,variedad, sum(numero_tallos) as numero_tallos, " +
          " plants_numbers,squars_meters" +
          " from "+this.table_inventory+"  WHERE 1=1 " +
          "and DATE(fecha_calidad) BETWEEN '"+this.fecha_inicio+"' AND '"+this.fecha_fin+"' ";

      if(this.codigo_bloque!=="ALL")
      {
          sql=sql +" and cod_bloque='"+this.codigo_bloque+"' ";
      }

      if(this.codigo_variedad!=="ALL")
      {
          sql=sql+" and codigo_variedad='"+this.codigo_variedad+"' ";
      }

      sql=sql+" GROUP BY cod_bloque,codigo_variedad,plants_numbers,squars_meters order by cod_bloque,variedad asc";

     // alert(sql);



      this.databaseObj.executeSql(sql , [])
          .then((res) => {
              this.inventoryData = [];
             // alert(res.rows.length);
              if (res.rows.length > 0) {
                  for (var i = 0; i < res.rows.length; i++) {
                      this.inventoryData.push(res.rows.item(i));
                  }
              }
          })
          .catch(e => {
              alert("error " + JSON.stringify(e))
          });

      setTimeout( function () {
          // @ts-ignore
          spnr.style="display:none";
          // @ts-ignore
          inform.style="display:block";
      }, 1000);


  }
    getBlock() {
      //alert("getBlock");
    var sql="SELECT * FROM " + this.table_block;
    //alert(sql);

        this.databaseObj.executeSql(sql , [])
            .then((res) => {
                this.blockData = [];
                //alert(res.rows.length);
                if (res.rows.length > 0) {
                    for (var i = 0; i < res.rows.length; i++) {
                        this.blockData.push(res.rows.item(i));
                    }
                }
            })
            .catch(e => {
                alert("error " + JSON.stringify(e))
            });




    }
    getVariety() {
        //alert("getVariety");

        this.databaseObj.executeSql("SELECT * FROM " +this.table_variety , [])
            .then((res) => {
                this.varietyData = [];
                //alert(res.rows.length);
                if (res.rows.length > 0) {
                    for (var i = 0; i < res.rows.length; i++) {
                        this.varietyData.push(res.rows.item(i));
                    }
                }
            })
            .catch(e => {
                alert("error " + JSON.stringify(e))
            });
    }

  logout() {
    this.authService.logout();
  }

}
