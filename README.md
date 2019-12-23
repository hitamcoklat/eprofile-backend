# DOKUMENTASI

Dokumentasi penggunaan API NodeJS eProfil Dinas Kesehatan Provinsi Jawa Barat.

## HTTP Request yang diijinkan

 - POST
 - GET

## Input Data

Return JSON

 - **Method**
POST
 - **URL**
    http://localhost:3001/table/input
 - **Data Param**
JSON Object
Contoh: 

```javascript
{
	"NAMA_FIELD": "JML_BALITA_L",
	"USERNAME": "3201234nanggung",
	"ID_DAERAH": "3201",
	"TAHUN": "2019",
	"BULAN": "7",
	"VALUE": "89",
	"STATUS_VERIFIKASI": "puskesmas"
}
```

## Update Data

Return JSON

 - **Method**
POST
 - **URL**
    http://localhost:3001/table/update?var=JML_BALITA_L&thn=2019&bln=7
    - **var** (Nama Field)
    - **thn** (Tahun)
    - **bln** (Bulan)

 - **Data Param**
JSON Object
Contoh: 

```javascript
{
	"NAMA_FIELD": "JML_BALITA_L",
	"USERNAME": "3201234nanggung",
	"ID_DAERAH": "3201",
	"TAHUN": "2019",
	"BULAN": "7",
	"VALUE": "89",
	"STATUS_VERIFIKASI": "puskesmas"
}
```

## Get Value Data

Diperuntukan untuk mengambil value/nila dari NAMA_FIELD yang diambil.

Return JSON

 - **Method**

GET

 - **URL**

    http://localhost:3001/table/getField?var=JML_BALITA_L&thn=2019&bln=7

    - **var** (Nama Field)
    - **thn** (Tahun)
    - **bln** (Bulan)

## Terimakasih Cinta
Footer    
