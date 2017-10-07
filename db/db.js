"use strict";

const SQL = require('sqlite3').verbose();
const Path = require('path');

let dbPath = Path.join(__dirname, './db.sqlite');

class DB {

  setPath(path) {
    dbPath = path;
  }

  getPath() {
    return dbPath
  }

  init() {
    // Load the db
    let database = new SQL.Database(dbPath);
    return database;
  }

  close(database, callback) {
    database.close(callback(e, obj));
  }

  /**
   * 保存数据到本地数据库文件
   * @param {object} database SQL instance
   */
  save(database) {
    let data = database.export();
    let buffer = new Buffer(data);
    fs.writeFileSync(dbPath, buffer);
    database.close();
  }

  run(sql, callback) {
    let database = this.init();
    database.run(sql, function (err, data) {
      if (err) callback(data, err);
      callback(data);
    });
  }

  update(sql, param, callback) {
    let database = this.init();
    database.run(sql, param, function (err, data) {
      if (err) callback(data, err);
      callback(data);
    });
  }

  exec(sql, callback) {
    let database = this.init();
    database.all(sql, function (err, data) {
      if (err) callback(data, err);
      callback(data);
    });
  }

  get(sql, callback) {
    let database = this.init();
    database.get(sql, function (err, data) {
      if (err) callback(data, err);
      callback(data);
    });
  }

  list(sql, callback) {
    let database = this.init();
    database.all(sql, function (err, data) {
      if (err) callback(data, err);
      callback(data);
    });
  }

  

}

exports.db = new DB();