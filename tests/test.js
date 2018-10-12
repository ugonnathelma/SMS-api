import { expect } from "chai";
import request from "supertest";
import { app } from "../index";
import { sequelize } from "../server/models";

describe("SMS API", () => {
  before(done => {
    sequelize.sync({ force: true }).then(() => {
      done();
    });
  });

  after(() => {
    process.exit(0);
  });

  describe("Contact route", () => {
    describe("/POST route", () => {
      it("does not allow the request body to be empty", done => {
        const req = {};
        request(app)
          .post("/api/contact")
          .send(req)
          .expect(422)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body.message).to.equal("Invalid input");
            done();
          });
      });

      it("does not allow empty name fields", done => {
        const req = {
          phoneNumber: "+2349086576454"
        };
        request(app)
          .post("/api/contact")
          .send(req)
          .expect(422)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body.message).to.equal("Invalid input");
            done();
          });
      });

      it("creates a new contact", done => {
        const req = {
          firstName: "Ugonna",
          lastName: "Thelma",
          phoneNumber: "+2349086576454"
        };

        request(app)
          .post("/api/contact")
          .send(req)
          .expect(201)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body.first_name).to.equal(req.firstName);
            expect(res.body.last_name).to.equal(req.lastName);
            expect(res.body.phone).to.equal(req.phoneNumber);
            done();
          });
      });
    });

    describe("/DELETE route", () => {
      it("returns error message if contact does not exist", done => {
        request(app)
          .delete("/api/contact/+23490865764")
          .send()
          .expect(404)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body.message).to.equal("Contact doesn't exist");
            done();
          });
      });

      it("Deletes a contact", done => {
        request(app)
          .delete("/api/contact/+2349086576454")
          .send()
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body.message).to.equal("Contact has been deleted");
            done();
          });
      });
    });
  });

  describe("Message route", () => {
    describe("/POST route", () => {
      it("does not allow an empty message to be sent", done => {
        const req = {};
        request(app)
          .post("/api/contact/+2349086576454/message/+2349086576454")
          .send(req)
          .expect(422)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body.message).to.equal("Invalid input");
            done();
          });
      });

      it("allows messages to be sent to existent contacts", done => {
        const req1 = {
          firstName: "Ugonna",
          lastName: "Thelma",
          phoneNumber: "+234908657645"
        };

        const req2 = {
          firstName: "Uchenna",
          lastName: "Thelma",
          phoneNumber: "+2349086576454"
        };

        const msgReq = {
          message: "hi"
        };

        request(app)
          .post("/api/contact")
          .send(req1)
          .then(res => {
            request(app)
              .post("/api/contact")
              .send(req2)
              .then(res => {
                request(app)
                  .post("/api/contact/+234908657645/message/+2349086576454")
                  .send(msgReq)
                  .expect(201)
                  .end((err, res) => {
                    if (err) {
           
                      return done(err);
                    }
                    expect(res.body.message).to.equal(msgReq.message);
                    expect(res.body.receiver).to.equal('+2349086576454');
                    expect(res.body.sender).to.equal('+234908657645');
                    done();
                  });
              });
          });
      });

      it("does not allow messages to be sent to a nonexistent contact", done => {
        const req1 = {
          firstName: "Ugonna",
          lastName: "Thelma",
          phoneNumber: "+234908657645"
        };

        const req2 = {
          firstName: "Uchenna",
          lastName: "Thelma",
          phoneNumber: "+2349086576454"
        };

        const msgReq = {
          message: "hi"
        };

        request(app)
          .post("/api/contact")
          .send(req1)
          .then(res => {
            request(app)
              .post("/api/contact")
              .send(req2)
              .then(res => {
                request(app)
                  .post("/api/contact/+2349086576454/message/+2349086576000")
                  .send(msgReq)
                  .expect(500)
                  .end((err, res) => {
                    if (err) {
                      return done(err);
                    }
                    expect(res.body.error).to.equal(
                      "An error occured. Check that receiver or sender number exists"
                    );
                    done();
                  });
              });
          });
      });

      it('deletes a users messages when the user is deleted', (done) => {
        const req1 = {
          firstName: "Ugonna",
          lastName: "Thelma",
          phoneNumber: "+234908657645"
        };

        const req2 = {
          firstName: "Uchenna",
          lastName: "Thelma",
          phoneNumber: "+2349086576454"
        };

        const msgReq = {
          message: "hi"
        };

        request(app)
          .post("/api/contact")
          .send(req1)
          .then(res => {
            request(app)
              .post("/api/contact")
              .send(req2)
              .then(res => {
                request(app)
                  .post("/api/contact/+2349086576454/message/+234908657645")
                  .send(msgReq)
                  .then(res => {
                    let message = res.body;
                    request(app)
                      .delete("/api/contact/+2349086576454")
                      .then(res => {
                        request(app)
                        .get(`/api/message/${message.id}`)
                        .expect(404)
                        .end((err, res) => {
                          console.log(res.body.error, 'here me')
                          expect(res.body.error).to.equal(
                            `Message with Id: ${message.id} doesn't exist`
                          );
                          done();
                        })
                      })
                  })
              });
          });
      })
    });
  });
});
