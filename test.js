const expect = require('expect');
const request = require('supertest');

const { app } = require('./index');

/*
before(function (done) {
    app.on("appStarted", function(){
        done();
    });
});
*/

describe('testing', ()=>{


    it('should get success flag true', function (done) {
		
        request(app)
             .get('/reminder')
            .expect(200)
            .expect((res)=>{
                expect(res.body.success).toBe(true);
            })
            .end(done);
    })

	
	
	
})