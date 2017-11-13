var mocha = require('mocha');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

//Importing our Audio model for our unit testing.
var Audio = require('../model/audioSchema');

describe("Get all Audios", function(){
     // Test will pass if we get all Audios
    it("should return all Audios", function(done){
        //Arrange
        var AudioMock = sinon.mock(Audio);
        var expectedResult = {status: true, Audio: []};

        AudioMock.expects('find').yields(null, expectedResult);

        //Act
        Audio.find(function (err, result) {
            AudioMock.verify();
            AudioMock.restore();

            //Assertion
            expect(result.status).to.be.true;
            done();
        });
    });

    // Test will pass if we fail to get a Audio
    it("should return error", function(done){
        var AudioMock = sinon.mock(Audio);
        var expectedResult = {status: false, error: "Something went wrong"};
        AudioMock.expects('find').yields(expectedResult, null);

        Audio.find(function (err, result) {
            AudioMock.verify();
            AudioMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});

describe("Post audio", function(){
    it("Save audio books", function(done){
        var AudioMock = sinon.mock(new Audio({ file_name: 'Novo arquivo.mp4', path: "files/novo_arquivo.mp4"}));
        var audio = AudioMock.object;
        var expectedResult = { status: true };


        AudioMock.expects('save').yields('error', expectedResult);

        audio.save(function(err, result){
            AudioMock.verify();
            AudioMock.restore();

            expect(result.status).to.be.true;
            done();
        });
    });
});
