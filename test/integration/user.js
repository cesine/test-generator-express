'use strict';

var debug = require('debug')('test:integration:user');
var expect = require('chai').expect;
var supertest = require('supertest');

var api = require('./../../');

describe('/users', function() {
    var user = {
        givenName: 'Anony',
        familyName: 'Mouse'
    };

    describe('POST', function() {
        it('should create', function(done) {
            supertest(api)
                .post('/users')
                .send(user)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    }

                    debug('created ', res.body);
                    expect(res.body).to.deep.equal({
                        id: res.body.id,
                        givenName: user.givenName,
                        familyName: user.familyName
                    });
                    user.id = res.body.id;

                    done();
                });
        });
    });

    describe('GET', function() {
        it('should list users', function(done) {
            supertest(api)
                .get('/users')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    }

                    expect(res.body).to.deep.equal({
                        [user.id]: user
                    });

                    done();
                });
        });

        it('should get a user', function(done) {
            supertest(api)
                .get('/users/' + user.id)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    }

                    expect(res.body).to.deep.equal(user);

                    done();
                });
        });
    });

    describe('PUT', function() {
        it('should update', function(done) {
            user.description = 'A sample user';

            supertest(api)
                .put('/users/' + user.id)
                .send(user)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    }

                    debug('updated ', res.body);
                    expect(res.body).to.deep.equal({
                        id: user.id,
                        givenName: user.givenName,
                        familyName: user.familyName,
                        description: user.description
                    });

                    done();
                });
        });
    });
});
