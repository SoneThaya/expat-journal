const supertest = require('supertest')
const server = require('./server')
const Users = require('./users/users-model')
const Stories = require('./stories/stories-model')

const database = require('./data/db-config')
const { add } = require('./users/users-model')

beforeEach(async () => {
  await database('users').truncate();
  await database('stories').truncate();
})


describe('Server End Points', () => {
  // checks server is running
  describe("GET to /", () => {

    it("can run the tests", () => {
      expect(true).toBeTruthy();
    });

    it("returns status code", () => {
      return supertest(server)
      .get("/")
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ api: "up and running"})
      })
    });
  })

// POST to register endpoint
  describe('POST to /register', () => {
    it("should create an account and return 201 status code", () =>{
      
      return supertest(server)
        .post("/api/auth/register")
        .send({
          username: 'steve',
          password: '123456'
        })
        .set('Accept', 'application/json')
        .then(res => {
          expect(res.status).toBe(201)
        })
      
      })
  })
  
  // POST to login endpoint
  describe("POST to /login", () => {
    it("Should be unauthorized and return status code 401", () =>{
      return supertest(server)
        .post("/api/auth/login")
        .set('Accept', 'application/json')
        .send({
          username: 'steve',
          password: '123456'
        })
        .then(response => {
          expect(response.status).toBe(401)
          expect(response.body).toHaveProperty('message')
        })
    })
  })

  // GET all stories endpoint
  describe('GET to /stories', () => {
    it('Should get all stories', () => {
      return supertest(server)
        .get('/api/stories')
        .then(response => {
          expect(response.status).toBe(200)
        })
    })
  })

  describe('GET to /id/my-stories', () => {
    it('should get all stories made by user', async () => {
      await supertest(server)
        .post('/api/auth/register')
        .send({
          username: 'steve',
          password: '123456'
        })
      
      const loginRes = await supertest(server)
        .post('/api/auth/login')
        .send({
          username: 'steve',
          password: '123456'
        })
      const id = await loginRes.body.id

      const response = await supertest(server)
        .get(`/api/stories/${id}/my-stories`)
        .set({ Authorization: loginRes.body.token })
        expect(response.status).toBe(200)
    })
  })

  // POST new story
  describe('POST to /stories', () => {
    it('should get a POST a new story', async () => {
      await supertest(server)
        .post('/api/auth/register')
        .send({
          username: 'steve',
          password: '123456'
        })
      
      const loginRes = await supertest(server)
        .post('/api/auth/login')
        .send({
          username: 'steve',
          password: '123456'
        })
     
      
      const addStory = await supertest(server)
        .post('/api/stories')
        .send({
          
          title: "Camping",
          location: "CapeCod",
          date: "June 25",
          description: "Camping on CapeCod!",
          storyImage: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          user_id: 1
          })
        .set({ Authorization: loginRes.body.token })
        expect(addStory.status).toBe(201)
    })
  })

  
// update story
  describe('PUT /api/recipes/id', () => {
    it('should return 200 updated', async () => {
      await supertest(server)
        .post('/api/auth/register')
        .send({
              
          username: "guillermo432",
          password: "123",
              
        })
      const loginResponse = await supertest(server)
        .post('/api/auth/login')
        .send({
          username: "guillermo432",
          password: "123",
        })
      const addResponse = await supertest(server)
        .post('/api/stories')
        .send({
        
          title: "Biking",
          location: "Berlin",
          date: "Sept 20",
          description: "Biking in Berlin",
          storyImage: "https://images.unsplash.com/photo-1592985316521-c1cac1269b11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
          user_id: 1
        })
        .set({ Authorization: loginResponse.body.token })
      expect(addResponse.status).toBe(201)
      const id = await addResponse.body.id
      const editResponse = await supertest(server)
        .put(`/api/stories/1`)
        .send({
         
          title: "testing",
          location: "Berlin",
          date: "Sept 20",
          description: "Biking in Berlin",
          storyImage: "https://images.unsplash.com/photo-1592985316521-c1cac1269b11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
          user_id: 1
        })
        .set({ Authorization: loginResponse.body.token })
      expect(editResponse.status).toBe(200)
    })
  })

  // DELETE story
  describe('DELETE to /stories/:id', () => {
   
    it('should get a DELETE a story', async () => {
      await supertest(server)
      .post('/api/auth/register')
      .send({
        username: 'steve',
        password: '123456'
      })
    
    const loginRes = await supertest(server)
      .post('/api/auth/login')
      .send({
        username: 'steve',
        password: '123456'
      })
   
    
    const addStory = await supertest(server)
      .post('/api/stories')
      .send({
        
        title: "delete test",
        location: "CapeCod",
        date: "June 25",
        description: "Camping on CapeCod!",
        storyImage: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        user_id: 1
        })
      .set({ Authorization: loginRes.body.token })
      expect(addStory.status).toBe(201)
      
      const id = await addStory.body.id

      const deleteStory = await supertest(server)
        .delete(`/api/stories/1`)
        .set({ Authorization: loginRes.body.token })
      expect(deleteStory.status).toBe(202)
    }, 30000)
  })

    


})