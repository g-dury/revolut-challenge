var assert = require('assert');

let utilities = require('../utilities.js')


describe('Utilities', function() {
  describe('is Date before Today', function() {
    it('should return true when date is before today', function() {
      assert.equal(true, utilities.isDateBeforeToday(new Date(1990-04-02)));
    });
    it('should return false when date is today', function() {
      assert.equal(false, utilities.isDateBeforeToday(new Date()));
    });
    it('should return false when date is in the future', function() {
      today = new Date()
      today.setMonth(today.getMonth()+8)
      assert.equal(false, utilities.isDateBeforeToday(today));
    });
  });
  describe('is Only letters', function() {
    it('should return true when has only letters', function() {
      assert.equal(true, utilities.isOnlyLetters("hello"));
    });
    it('should return false when has number', function() {
      assert.equal(false, utilities.isOnlyLetters("hello42"));
    });
    it('should return false when has weird characters', function() {
      assert.equal(false, utilities.isOnlyLetters("hello@"));
    });
  });
  describe('is date today', function() {
    it('should return true when date is today', function() {
      assert.equal(true, utilities.isDateToday(new Date()));
    });
    it('should return true when date is today but 2 years before', function() {
      today = new Date()
      today.setFullYear(today.getFullYear()-2)
      assert.equal(true, utilities.isDateToday(today));
    });
    it('should return false when has weird characters', function() {
      assert.equal(false, utilities.isOnlyLetters("hello@"));
    });
  });
});
