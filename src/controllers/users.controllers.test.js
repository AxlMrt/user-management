import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../index.js';
import pool from '../../config/db/db.js';

chai.use(chaiHttp);

const expect = chai.expect;
const baseUrl = '/api/v1/users';
const mockUsers = [
  {
    user_id: 1,
    firstName: 'John',
    lastName: 'Doe',
    password: 'hashed_password_1',
    email: 'john.doe@example.com',
  },
  {
    user_id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    password: 'hashed_password_2',
    email: 'jane.smith@example.com',
  },
];

describe('GET /users', () => {
  let queryStub;

  beforeEach(() => {
    queryStub = sinon.stub(pool, 'execute');
  });

  afterEach(() => {
    queryStub.restore();
  });

  it('should return 200 status', async () => {
    queryStub.resolves([[], {}]);

    const response = await chai.request(app).get(baseUrl);

    expect(response).to.have.status(200);
  });

  it('should return an empty array', async () => {
    queryStub.resolves([[], {}]);

    const response = await chai.request(app).get(baseUrl);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array').that.is.empty;
  });

  it('should return a users array with data', async () => {
    queryStub.resolves([mockUsers, {}]);

    const response = await chai.request(app).get(baseUrl);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array').that.has.lengthOf.at.least(1);
  });

  it('should return users array with all properties except password', async () => {
    queryStub.resolves([mockUsers, {}]);

    const response = await chai.request(app).get(baseUrl);

    expect(response).to.have.status(200);

    response.body.forEach((user) => {
      expect(user).to.not.have.property('password');
      expect(user).to.have.property('user_id');
      expect(user).to.have.property('firstName');
      expect(user).to.have.property('lastName');
      expect(user).to.have.property('email');
    });
  });

  it('should return 500 status', async () => {
    queryStub.rejects(new Error('Database Error'));

    const response = await chai.request(app).get(baseUrl);

    expect(response).to.have.status(500);
    expect(response.body).to.have.property(
      'error',
      'Error while fetching /users.'
    );
  });
});

describe('GET /users/:id', () => {
  const user = mockUsers[0];
  let queryStub;

  beforeEach(() => {
    queryStub = sinon.stub(pool, 'execute');
  });

  afterEach(() => {
    queryStub.restore();
  });

  it('should return 200 status', async () => {
    queryStub.resolves([user, {}]);

    const response = await chai.request(app).get(`${baseUrl}/${user.user_id}`);

    expect(response).to.have.status(200);
  });

  it('should return 404 status', async () => {
    queryStub.resolves([]);

    const reponse = await chai.request(app).get(`${baseUrl}/123`);

    expect(reponse).to.have.status(404);
    expect(reponse.body).to.have.property('error', 'User not found.');
  });

  it('should return 500 status', async () => {
    queryStub.rejects(new Error('Database Error.'));

    const response = await chai.request(app).get(`${baseUrl}/${user.user_id}`);

    expect(response).to.have.status(500);
    expect(response.body).to.have.property('error');
  });

  it('should return user data with valid property', async () => {
    queryStub.resolves([user, {}]);

    const response = await chai.request(app).get(`${baseUrl}/${user.user_id}`);

    expect(response).to.have.status(200);
    expect(response.body).to.not.have.property('password');
    expect(response.body).to.have.property('firstName');
    expect(response.body).to.have.property('lastName');
    expect(response.body).to.have.property('email');
  });
});

describe('POST /users', () => {
  const newUser = mockUsers[0];
  let queryStub;

  beforeEach(() => {
    queryStub = sinon.stub(pool, 'execute');
  });

  afterEach(() => {
    queryStub.restore();
  });

  it('should return 201 status', async () => {
    queryStub.resolves([[{ insertId: 1 }], {}]);

    const response = await chai.request(app).post(baseUrl).send(newUser);

    expect(response).to.have.status(201);
  });

  it('should return 500', async () => {
    queryStub.rejects(new Error('Database Error.'));

    const response = await chai.request(app).post(baseUrl).send(newUser);

    expect(response).to.have.status(500);
    expect(response.body).to.have.property('error');
  });
});

describe('PUT /users/:id', () => {
  const userId = mockUsers[0].user_id;
  let queryStub;

  beforeEach(() => {
    queryStub = sinon.stub(pool, 'execute');
  });

  afterEach(() => {
    queryStub.restore();
  });

  it('should return 200 status', async () => {
    queryStub.resolves([{ affectedRows: 1 }, {}]);

    const response = await chai
      .request(app)
      .put(`${baseUrl}/${userId}`)
      .send(mockUsers[0]);

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal({ message: 'User updated.' });
  });

  it('should return 404 status', async () => {
    queryStub.resolves([{ affectedRows: 0 }, {}]);

    const response = await chai
      .request(app)
      .put(`${baseUrl}/${userId}`)
      .send(mockUsers[0]);

    expect(response).to.have.status(404);
    expect(response.body).to.have.property('error', 'User not found.');
  });

  it('should return 500 status on failed user update', async () => {
    queryStub.rejects(new Error('Database Error'));

    const response = await chai
      .request(app)
      .put(`${baseUrl}/${userId}`)
      .send(mockUsers[0]);

    expect(response).to.have.status(500);
    expect(response.body).to.have.property(
      'error',
      'Error while updating /users/:id.'
    );
  });
});

describe('DELETE /users/:id', () => {
  const userId = 1;
  let queryStub;

  beforeEach(() => {
    queryStub = sinon.stub(pool, 'execute');
  });

  afterEach(() => {
    queryStub.restore();
  });

  it('should return 200 status', async () => {
    queryStub.resolves([{ affectedRows: 1 }, {}]);

    const response = await chai.request(app).delete(`${baseUrl}/${userId}`);

    expect(response).to.have.status(200);
  });

  it('should return 404 status', async () => {
    queryStub.resolves([{ affectedRows: 0 }, {}]);

    const response = await chai.request(app).delete(`${baseUrl}/${userId}`);

    expect(response).to.have.status(404);
    expect(response.body).to.have.property('error', 'User not found.');
  });

  it('should return 500 status', async () => {
    queryStub.rejects(new Error('Database Error'));

    const response = await chai.request(app).delete(`${baseUrl}/${userId}`);

    expect(response).to.have.status(500);
    expect(response.body).to.have.property(
      'error',
      'Error while deleting /users/:id'
    );
  });
});
