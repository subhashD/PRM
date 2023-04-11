//Require the dev-dependencies
const { chai, expect, server } = require('./../config')
const { closeDatabase } = require('../test-setup/db-config')
const { seedUser } = require('../test-setup/seed')
//Our parent block
describe('Users', () => {
  before(() => {
    //Before each test we remove all the users
    seedUser()
  })

  // beforeEach((done) => {
  //   //Before each test we remove all the users
  //   User.remove({}, (err) => {
  //     done()
  //   })
  // })

  after(() => {
    //Before each test we remove all the users
    closeDatabase()
  })
  /*
   * Test the /GET route
   */
  describe('/GET user/profile', () => {
    it('it should result unauthenticated', (done) => {
      chai
        .request(server)
        .get('/api/user/profile')
        .end((err, res) => {
          if (err) {
            throw err
          }
          expect(res.status).to.eql(401)
          done()
        })
    })
  })

  /*
   * Register route route
   */
  describe('/POST auth/register', () => {
    it('it should fail to register the user if any of the field in request body is invalid', (done) => {
      chai
        .request(server)
        .post('/api/auth/register')
        .send({
          firstname: 'ronny',
          lastname: 'rokda',
          password: 'Subhash2023',
          email: 'ronny_rokda1@gmail.com',
        })
        .end((err, res) => {
          if (err) {
            throw err
          }
          expect(res.status).to.eql(422)
          expect(res.body.status).to.eql(false)
          expect(res.body.message).to.eql('Validations failed!!')
          expect(res.body).to.have.own.property('errors')
          done()
        })
    })

    it('it should fail to register the user saying firstname is empty or not a string', (done) => {
      chai
        .request(server)
        .post('/api/auth/register')
        .send({
          firstname: 123,
          lastname: 'rokda',
          password: 'Subhash@2023',
          email: 'ronny_rokda1@gmail.com',
        })
        .end((err, res) => {
          if (err) {
            throw err
          }
          expect(res.status).to.eql(422)
          expect(res.body.status).to.eql(false)
          expect(res.body).to.have.own.property('errors')
          expect(res.body.errors).to.be.an('array')
          expect(res.body.errors).to.have.nested.property('[0].firstname')

          done()
        })
    })
  })

  it('it should fail to login the user with 422 status code', (done) => {
    chai
      .request(server)
      .post('/api/auth/login')
      .send({
        password: '',
        email: 'ronny_rokda1@gmail.com',
      })
      .end((err, res) => {
        if (err) {
          throw err
        }
        expect(res.status).to.eql(422)
        expect(res.body.status).to.eql(false)
        done()
      })
  })

  /*
   * Login user route
   */
  describe('/POST auth/login', () => {
    it('it should fail to login the user', (done) => {
      chai
        .request(server)
        .post('/api/auth/login')
        .send({
          password: 'Subhash2023',
          email: 'ronny_rokda1@gmail.com',
        })
        .end((err, res) => {
          if (err) {
            throw err
          }
          expect(res.status).to.eql(404)
          expect(res.body.status).to.eql(false)
          done()
        })
    })
  })

  /*
   * Login user route
   */
  describe('/POST auth/login', () => {
    it('it should login the user', (done) => {
      chai
        .request(server)
        .post('/api/auth/login')
        .send({
          password: 'Subhash@1234',
          email: 'steven@example.com',
        })
        .end((err, res) => {
          if (err) {
            throw err
          }
          expect(res.status).to.eql(200)
          expect(res.body.status).to.eql(true)
          expect(res.body)
            .has.property('data')
            .that.includes.all.keys(['user', 'access_token', 'refresh_token'])
          expect(res.body.data).has.property('access_token').is.a('string')
          done()
        })
    })
  })
})
