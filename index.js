'use strict'
var express = require('express');
var cors = require('cors');
const app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// MODELS
var Table = require('./models/table');
var ModelDesa = require('./models/ModelDesa');
// PORT
var PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/profil');
var db = mongoose.connection;

app.get('/', function(req, res) {
	res.send("Hello World!");
});

/*
* Get Data By Field Name
* @param NAMA_FIELD, TAHUN, BULAN
* return Array
*/
app.get('/table/getField', function(req, res) {
	var d = new Date();
	var blnGet = (req.query.bln == 'Pilih Bulan') ? 1 : req.query.bln;
	var thnGet = (req.query.thn == 'Pilih Tahun') ? 1 : req.query.thn;
	var data = {
		'NAMA_FIELD': req.query.var,
		'TAHUN'		: (typeof req.query.thn !== 'undefined') ? thnGet : d.getFullYear(),
		'BULAN'		: (typeof req.query.bln !== 'undefined') ? blnGet : d.getMonth() + 1,
		'USERNAME'	: req.query.username,
		'ID_DESA'	: req.query.id_desa
	};
	Table.getByValue(data, (err, data) => {
		if(err) {
			throw err;
		} 
		res.json(data);		
	})
});

app.get('/table/getFieldRS', function (req, res) {
	var d = new Date();
	var blnGet = (req.query.bln == 'Pilih Bulan') ? 1 : req.query.bln;
	var thnGet = (req.query.thn == 'Pilih Tahun') ? 1 : req.query.thn;	
	var data = {
		'NAMA_FIELD': req.query.var,
		'TAHUN': (typeof req.query.thn !== 'undefined') ? thnGet : d.getFullYear(),
		'BULAN': (typeof req.query.bln !== 'undefined') ? blnGet : d.getMonth() + 1,
		'USERNAME': req.query.username
	};

	Table.getByValue(data, (err, data) => {
		if (err) {
			throw err;
		}
		res.json(data);
	})
});

/* 
* Get Rekap
*/
app.get('/table/getRekap', function (req, res) {
	var d = new Date();
	var fromBln = (req.query.fromBln == 'Pilih Bulan') ? 1 : req.query.fromBln;
	var toBln = (req.query.toBln == 'Pilih Bulan') ? 1 : req.query.toBln;
	var getThn = (req.query.thn == 'Pilih Tahun') ? 1 : req.query.thn;
	var data = {
		'TAHUN': (typeof req.query.thn !== 'undefined') ? getThn : d.getFullYear(),
		'FROM_BULAN': (typeof req.query.fromBln !== 'undefined') ? fromBln : d.getMonth() + 1,
		'TO_BULAN': (typeof req.query.toBln !== 'undefined') ? toBln : d.getMonth() + 1,
		'USERNAME': req.query.username,
	};
	Table.getRekap(data, (err, data) => {
		if (err) {
			throw err;
		} res.json(data);
	})
});

app.get('/table/getRekapValue', function (req, res) {
	var d = new Date();
	var data = {
		'NAMA_FIELD' : req.query.field,
		'TAHUN': (typeof req.query.thn !== 'undefined') ? req.query.thn : d.getFullYear(),
		'FROM_BULAN': (typeof req.query.fromBln !== 'undefined') ? req.query.fromBln : d.getMonth() + 1,
		'TO_BULAN': (typeof req.query.toBln !== 'undefined') ? req.query.toBln : d.getMonth() + 1,
		'USERNAME': req.query.username,
	};
	Table.getRekapValue(data, (err, data) => {
		if (err) {
			throw err;
		}
		res.json(data);
	})
});

/*
* Update Data
* @param NAMA_FIELD, TAHUN, BULAN, USERNAME
* return Array
*/
app.post('/table/update', function(req, res) {
	var d = new Date();
	var data = req.body;
	var query = {
		'NAMA_FIELD': req.query.var,
		'TAHUN'		: req.query.thn,
		'BULAN'		: req.query.bln,
		'USERNAME'	: req.query.username,
	};
	Table.updateData(query, data, (err, data) => {
		if(err) {
			throw err;
		} 
		res.json(data);		
	})
});

/*
* Delete Data/Reset
* @param NAMA_FIELD, TAHUN, BULAN, USERNAME
* return Array
*/
app.get('/table/delete', function (req, res) {
	// var data = req.body;
	var query = {
		'NAMA_FIELD': req.query.var,
		'TAHUN': req.query.thn,
		'BULAN': req.query.bln,
		'USERNAME': req.query.username,
	};
	console.log(query)
	Table.deleteOne(query, (err, data) => {
		if (err) {
			throw err;
		}
		res.json(data);
	})
});

// INPUT DATA TABLE
app.post('/table/input', function(req, res) {
	var table = req.body;
	console.log('kampret')
	console.log(table)
	Table.addData(table, (err, table) => {
		if(err) {
			throw err;
		} 
		res.json(table);
	});
});

/*
* Get One Data By Field Name
* @param NAMA_FIELD, TAHUN, BULAN
* return Array
*/
app.get('/table/getOneData', function(req, res) {
	var d = new Date();
	var data = {
		'NAMA_FIELD': req.query.var,
		'TAHUN'		: (typeof req.query.thn !== 'undefined') ? req.query.thn : d.getFullYear(),
		'BULAN'		: (typeof req.query.bln !== 'undefined') ? req.query.bln : d.getMonth() + 1
	};
	Table.getOneData(data, (err, data) => {
		if(err) {
			throw err;
		} 
		res.json(data);		
	})
});

/* 
 * DESA
*/
app.get('/desa/hapusDesaById', function (req, res) {
	const data = { 'id': req.query.id };
	console.log(data)
	ModelDesa.removeData(data, (err, data) => {
		if (err) {
			throw err;
		}
		res.json(data);
	});
});

app.post('/desa/inputDesa', function (req, res) {
	var data = req.body;
	ModelDesa.addData(data, (err, table) => {
		if (err) {
			throw err;
		}
		res.json(data);
	});
});

app.post('/desa/updateDesa', function (req, res) {
	var data = req.body;
	ModelDesa.updateData(data, (err, table) => {
		if (err) {
			throw err;
		}
		res.json(data);
	});
});

app.get('/desa/getListDesaByPuskesmas', function(req, res) {
	const data = { 'ID_PUSKESMAS' : req.query.idPus };
	ModelDesa.getAllByIDPuskesmas(data, (err, data) => {
		if (err) {
			throw err;
		} res.json(data);
	})
})

app.get('/desa/getAllDesa', function (req, res) {
	ModelDesa.getAllDesa(data, (err, data) => {
		if (err) {
			throw err;
		}
		res.json(data);
	})
})

app.listen(PORT);
console.log('Running on port ' + PORT);