'use strict';

var expect = require('chai').expect;
var supertest = require('supertest');

var service = require('./../../');

describe('/', function() {
  it('should load', function() {
    expect(service).to.be.a('function');
  });

  describe('errors', function() {
    it('should handle api routes which are not found', function(done) {
      supertest(service)
        .get('/v1/notexistant')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          expect(res.body).to.deep.equal({
            error: res.body.error,
            message: 'Not Found',
            status: 404
          });

          done();
        });
    });

    it('should handle pages which are not found', function(done) {
      supertest(service)
        .get('/notexistant')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          expect(res.text).to.equal('<!doctype html>' +
            '\n<html lang="en">' +
            '\n<head>' +
            '\n  <meta charset="UTF-8">' +
            '\n  <meta name="viewport" content="width=device-width">' +
            '\n  <title>error</title>' +
            '\n  <link rel="stylesheet" href="/css/style.css">' +
            '\n</head>' +
            '\n<body>' +
            '\n' +
            '\n' +
            '\n  ' +
            '\n  Not Found' +
            '\n  ' +
            '\n    ' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n  </body>' +
            '\n</html>' +
            '\n');

          done();
        });
    });
  });
});
