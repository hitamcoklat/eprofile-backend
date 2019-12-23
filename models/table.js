var mongoose = require('mongoose');

var tablesSchema = mongoose.Schema({
  NAMA_FIELD: {
    type: String
  },
  USERNAME: {
    type: String
  },
  ID_DESA: {
	type: String
  },
  ID_DAERAH: {
    type: String
  },
  TAHUN: {
    type: Number
  },
  BULAN: {
	type: Number
  },
  VALUE: {
    type: String
  },
  STATUS_VERIFIKASI: {
    type: String
  },
  DATA_REKAP: {
	type: String
  },
  create_date: {
  	type: Date,
  	default: Date.now
  }
});

var d = new Date();
	d = d.getFullYear();

// insert data table
module.exports.addData = function(table, callback) {
	d = (table.TAHUN == d) ? d : table.TAHUN;
var Table = module.exports = mongoose.model('Table' + d, tablesSchema);
	Table.create(table, callback);
}

// update data table
module.exports.updateData = function(q, data, callback) {
	
	d = (q.TAHUN == d) ? d : q.TAHUN;
	
	var query = {
		NAMA_FIELD	: q.NAMA_FIELD,
		TAHUN		: q.TAHUN,
		BULAN		: q.BULAN,
		USERNAME	: q.USERNAME
	};
	
	var Table = module.exports = mongoose.model('Table' + d, tablesSchema);
	
	Table.update(query, { $set: data }, callback);

}

// get by VALUE 
module.exports.getByValue = function(data, callback) {
	
	d = (data.TAHUN == 'Pilih Tahun') ? '2019' : data.TAHUN; 
	d = (data.TAHUN == d) ? d : data.TAHUN;
	var Table = module.exports = mongoose.model('Table' + d, tablesSchema);	
	
	Table.find({ 
		NAMA_FIELD	: data.NAMA_FIELD,
		TAHUN		: data.TAHUN,
		BULAN		: data.BULAN,
		ID_DESA		: data.ID_DESA,
		USERNAME	: data.USERNAME,
	}, callback);

}

module.exports.getRekap = function (data, callback) {

	var Table = module.exports = mongoose.model('Table' + d, tablesSchema);

	Table.find({ "BULAN": { $gte: data.FROM_BULAN, $lte: data.TO_BULAN }, USERNAME : data.USERNAME, TAHUN : data.TAHUN }, callback);

}

module.exports.getRekapValue = function (data, callback) {

	var Table = module.exports = mongoose.model('Table' + d, tablesSchema);

	Table.find({ 
		"BULAN": { $gte: data.FROM_BULAN, $lte: data.TO_BULAN }, 
		"USERNAME" : data.USERNAME, 
		"TAHUN" : data.TAHUN, 
		"NAMA_FIELD" : data.NAMA_FIELD 
	}, callback);

}

// get by VALUE 
module.exports.getOneData = function(data, callback) {
	
	d = (data.TAHUN == d) ? d : data.TAHUN;
	
	var Table = module.exports = mongoose.model('Table' + d, tablesSchema);	
	
	Table.findOne({ 
		NAMA_FIELD	: data.NAMA_FIELD,
		TAHUN		: data.TAHUN,
		BULAN		: data.BULAN,
		USERNAME	: data.USERNAME
	}, callback);

}

// Remove Document
module.exports.deleteOne = function (data, callback) {

	d = (data.TAHUN == d) ? d : data.TAHUN;

	var Table = module.exports = mongoose.model('Table' + d, tablesSchema);

	Table.deleteOne({
		NAMA_FIELD: data.NAMA_FIELD,
		TAHUN: data.TAHUN,
		BULAN: data.BULAN,
		USERNAME: data.USERNAME
	}, callback);

}