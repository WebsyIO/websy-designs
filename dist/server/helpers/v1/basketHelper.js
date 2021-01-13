// store basket contents in db
module.exports = {
  getBasket: function (req, dbHelper) {
    return new Promise((resolve, reject) => {
      if (req.session && req.session.user) {
        const sql = `
          SELECT * FROM ${req.params.basketCompare} WHERE userid = '${req.session.user.id}'
        `
        dbHelper.execute(sql).then(result => {
          if (result.rows.length > 0) {
            let basket = result.rows[0] 
            basket.items = JSON.parse(basket.items)            
            basket.meta = JSON.parse(basket.meta)
            resolve(basket)
          }
          else {
            resolve({items: {}, meta: {}})
          }
        })
      }
      else {      
        resolve({items: {}, meta: {}})
      } 
    })
  }
}
