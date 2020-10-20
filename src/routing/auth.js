const express = require('express')
const router = express.Router()

function AuthRoutes (pgHelper) {
  console.log(Object.keys(pgHelper))
  if (!pgHelper.client) {
    pgHelper.onReadyCallbackFn = readyCallback
  }
  else {
    readyCallback()
  }   
  router.post('/signup', (req, res) => {
    res.json('ok')
  })

  function readyCallback () {
    pgHelper.execute(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name   = 'session'
      );
    `).then(result => {
      console.log(result)
      if (result.rows && result.rows[0] && result.rows[0].exists === false) {
        pgHelper.execute(`
          CREATE TABLE "session" (
            "sid" varchar NOT NULL COLLATE "default",
            "sess" json NOT NULL,
            "expire" timestamp(6) NOT NULL
          )
          WITH (OIDS=FALSE);
          
          ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
          
          CREATE INDEX "IDX_session_expire" ON "session" ("expire");
        `)
      }
    }, err => console.log(err))
  }

  return router
}

module.exports = AuthRoutes
