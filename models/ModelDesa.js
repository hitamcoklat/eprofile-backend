var mongoose = require('mongoose');

var tablesSchemaDesa = mongoose.Schema({
    ID_PUSKESMAS: { type: String },
    NAMA_DESA: { type: String }
});

// insert data table
module.exports.addData = function (data, callback) {
    var Table = module.exports = mongoose.model('table', tablesSchemaDesa, 'daftar-desa');
    Table.create(data, callback);
}

// remove data by id
module.exports.removeData = function(data, callback) {
    var Table = module.exports = mongoose.model('table', tablesSchemaDesa, 'daftar-desa');
    Table.deleteOne({ _id: mongoose.Types.ObjectId(data.id) }, callback)
}

// update data table
module.exports.updateData = function (data, callback) {
    var query = {
        _id: mongoose.Types.ObjectId(data.ID_DESA),        
    };
    var Table = module.exports = mongoose.model('table', tablesSchemaDesa, 'daftar-desa');
    Table.update(query, { $set: { NAMA_DESA: data.NAMA_DESA } }, callback);
}

module.exports.getAllDesa = () => {
    const Table = module.exports = mongoose.model('table', tablesSchemaDesa, 'daftar-desa');
    Table.find({}, callback);
}

// get by VALUE 
module.exports.getAllByIDPuskesmas = function (data, callback) {

    var Table = module.exports = mongoose.model('table', tablesSchemaDesa, 'daftar-desa');

    Table.find({
        'ID_PUSKESMAS': data.ID_PUSKESMAS
    }, callback);

}