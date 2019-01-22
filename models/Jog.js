var db = require('../database')

// get the queries ready - note the ? placeholders
var insertJog = db.prepare(
    'INSERT INTO jog (user_id, start_time, date, distance, duration) VALUES (?, ?, ?, ?, ?)'
)

var selectJogById = db.prepare('SELECT * FROM jog WHERE id = ?')
var selectJogByUser = db.prepare('SELECT * FROM jog WHERE user_id = ?')

class Jog {
    static insert(user_id, start_time, date, distance, duration) {
        // run the insert query
        var info = insertJog.run(user_id, start_time, date, distance, duration)

        // check what the newly inserted row id is
        var jogId = info.lastInsertRowid

        return jogId
    }

    static findById(id) {
        var row = selectJogById.get(id)

        if (row) {
            return new Jog(row)
        } else {
            return null
        }
    }

    static findByUser(user_id) {
        var row = selectJogByUser.get(user_id)

        if (row) {
            return new Jog(row)
        } else {
            return null
        }
    }

    static findAllFromUser(user_id){
        var allJogs = selectJogByUser.all(user_id)
        return allJogs

    }

    constructor(databaseRow) {
        this.user_id = databaseRow.user_id
        this.id = databaseRow.id
        this.start_time = databaseRow.start_time
        this.date = databaseRow.date
        this.distance = databaseRow.distance
        this.duration = databaseRow.duration


    }
}

module.exports = Jog


/*console.log(db)
console.log(db.table)
var selectJogAll = db.prepare('SELECT * FROM jog')
var updateJogById = db.prepare('UPDATE jog SET date = ?, duration = ?, distance = ? WHERE id = ?;')

var selectJogByDate = db.prepare('SELECT * FROM jog WHERE duration = ?')


  static updateJogById(date, duration, distance, id) {
    // run the insert query
    updateJogById.run(date, duration, distance, id)
  }



  static findAll() {
    var allData = selectJogAll.all()
    return allData
  }

  static findAllByUserID(id) {
    var allData = selectJogByUserId.all(id)
    return allData
  }

  static deleteTimeByID(id){
    var row = deleteJog.run(id)
    if (row) {
      return new Jog(row)
    } else {
      return null
    }
  }

  static findByDate(date) {
    var row = selectJogByDate.get(date)

    if (row) {
      return new Jog(row)
    } else {
      return null
    }
  }

  constructor(databaseRow) {
    this.id = databaseRow.id
    this.duration = databaseRow.duration
    this.date = databaseRow.date
    this.distance = databaseRow.distance
  }
}
*/