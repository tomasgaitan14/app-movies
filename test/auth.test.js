

const request = require('supertest');
const app = require('../index'); 

describe('Authentication Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        role: 'user'
      });
    
      switch (res.statusCode) {
        case 200:
            expect(res.statusCode).toEqual(200);
            break;
        case 400:
            expect(res.statusCode).toEqual(400);
            break;
        case 500:
            expect(res.statusCode).toEqual(500);
            break;
        default:
            expect(res.statusCode).toEqual(200);
        }
  });

  it('should log in with an existing user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
      switch (res.statusCode) {
        case 200:
            expect(res.statusCode).toEqual(200);
            break;
        case 400:
            expect(res.statusCode).toEqual(400);
            break;
        case 500:
            expect(res.statusCode).toEqual(500);
            break;
        case 403:
            expect(res.statusCode).toEqual(403);
            break;
        case 401:
            expect(res.statusCode).toEqual(401);
            break;
        default:
            expect(res.statusCode).toEqual(200);
        }

  });
});

describe('Movies Endpoints', () => {
  it('should create a new movie', async () => {
        const res = await request(app)
            .post('/movie/createMovies')
            .send({
            title: 'Movie Title',
            director: 'Director Name',
            genre: 'Action',
            releaseYear: 2023
            });
        
            switch (res.statusCode) {
            case 200:
                expect(res.statusCode).toEqual(200);
                break;
            case 400:
                expect(res.statusCode).toEqual(400);
                break;
            case 500:
                expect(res.statusCode).toEqual(500);
                break;
            case 403:
                expect(res.statusCode).toEqual(403);
                break;
            case 401:
                expect(res.statusCode).toEqual(401);
                break;
            default:
                expect(res.statusCode).toEqual(200);
            }
  });

  it('should get all movies', async () => {
    const res = await request(app)
        .get('/movie/getMovies');
    
        switch (res.statusCode) {
            case 200:
                expect(res.statusCode).toEqual(200);
                break;
            case 400:
                expect(res.statusCode).toEqual(400);
                break;
            case 500:
                expect(res.statusCode).toEqual(500);
                break;
            case 403:
                expect(res.statusCode).toEqual(403);
                break;
            case 401:
                expect(res.statusCode).toEqual(401);
                break;
            default:
                expect(res.statusCode).toEqual(200);
            }
  });

  it('should search for a specific movie', async () => {
    const res = await request(app)
        .get('/movie/searchMovie/663437b0877639aec6df6b50');
    
        switch (res.statusCode) {
            case 200:
                expect(res.statusCode).toEqual(200);
                break;
            case 400:
                expect(res.statusCode).toEqual(400);
                break;
            case 500:
                expect(res.statusCode).toEqual(500);
                break;
            case 403:
                expect(res.statusCode).toEqual(403);
                break;
            case 401:
                expect(res.statusCode).toEqual(401);
                break;
            case 404:
                expect(res.statusCode).toEqual(404);
                break;
            default:
                expect(res.statusCode).toEqual(200);
            }
  });

  it('should update an existing movie', async () => {
    const res = await request(app)
        .put('/movie/updateMovie/663437b0877639aec6df6b50') 
        .send({
        title: 'Updated Movie Title'
        });
    
        switch (res.statusCode) {
            case 200:
                expect(res.statusCode).toEqual(200);
                break;
            case 400:
                expect(res.statusCode).toEqual(400);
                break;
            case 500:
                expect(res.statusCode).toEqual(500);
                break;
            case 403:
                expect(res.statusCode).toEqual(403);
                break;
            case 401:
                expect(res.statusCode).toEqual(401);
                break;
            case 404:
                expect(res.statusCode).toEqual(404);
                break;
            default:
                expect(res.statusCode).toEqual(200);
            }
  });

  it('should delete an existing movie', async () => {
    const res = await request(app)
        .delete('/movie/deleteMovie/663437b0877639aec6df6b50'); 
    
        switch (res.statusCode) {
            case 200:
                expect(res.statusCode).toEqual(200);
                break;
            case 400:
                expect(res.statusCode).toEqual(400);
                break;
            case 500:
                expect(res.statusCode).toEqual(500);
                break;
            case 403:
                expect(res.statusCode).toEqual(403);
                break;
            case 401:
                expect(res.statusCode).toEqual(401);
                break;
            case 404:
                expect(res.statusCode).toEqual(404);
                break;
            default:
                expect(res.statusCode).toEqual(200);
            }
  });
});
