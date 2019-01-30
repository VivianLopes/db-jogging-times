var db = require('../database')

// get the queries ready - note the ? placeholders
var insertFollowing = db.prepare('INSERT INTO following (followee_id, follower_id) VALUES (?, ?)')


class Following {
    static insert(followee_id, follower_id) {
        // run the insert query
        var info = insertFollowing.run(followee_id, follower_id)
        // check what the newly inserted row id is
        var followingId = info.lastInsertRowid
        return followingId
    }

    constructor(databaseRow) {
        this.followee_id = databaseRow.followee_id
        this.follower_id = databaseRow.follower_id


    }
}

module.exports = Following
