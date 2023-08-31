const { v4: uuid4 } = require('uuid')

// id, roomId, guestName, checkInDate, checkOutDate

class Booking {
    constructor(roomId, guestName, checkInDate, checkOutDate) {
        this.id = uuid4()
        this.roomId = roomId
        this.guestName = guestName
        this.checkInDate = checkInDate,
        this.checkOutDate = checkOutDate
    }
}

module.exports = Booking