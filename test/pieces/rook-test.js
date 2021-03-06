const chai = require('chai');
const assert = chai.assert;

var Game = require('../../lib/game');
var Board = require('../../lib/board');
var Loader = require('../../lib/loader');
var Piece = require('../../lib/piece');
var Rook = require('../../lib/pieces/rook');
var King = require('../../lib/pieces/king');

describe('Rook', function () {

  beforeEach (function () {
    this.board = new Board ();
    this.loader = new Loader (this.board);
    this.game = new Game (this.board);
    this.board.game = this.game;
    this.loader.createSquares();
    this.board.squares = this.loader.squares;
    this.square = this.board.findSquare(1, 6);
    this.rook = new Rook (this.square, "black");
    this.square.piece = this.rook;
    this.whiteKingsSquare = this.board.findSquare(4, 7);
    this.whiteKing = new King (this.whiteKingsSquare, "white");
    this.whiteKingsSquare.piece = this.whiteKing;
    this.blackKingsSquare = this.board.findSquare(4, 0);
    this.blackKing = new King (this.blackKingsSquare, "black");
    this.blackKingsSquare.piece = this.blackKing;
    this.game.turn = "black";
  });

  it('should instantiate a new piece', function () {
    assert.isObject(this.rook);
  });

  it('should know its square', function () {
    assert.equal(this.rook.square, this.square);
  });

  it('should know its color', function () {
    assert.equal(this.rook.color, "black");
  });

  it('should know if it can move up to any given empty spaces', function () {
    let squareTwo = this.board.findSquare (2, 6);
    let squareThree = this.board.findSquare (3, 6);
    let squareFour = this.board.findSquare (4, 6);
    let squareFive = this.board.findSquare (5, 6);
    let squareSix = this.board.findSquare (6, 6);
    let squareSeven = this.board.findSquare (7, 6);

    assert(this.rook.canMoveTo(squareTwo));
    assert(this.rook.canMoveTo(squareThree));
    assert(this.rook.canMoveTo(squareFour));
    assert(this.rook.canMoveTo(squareFive));
    assert(this.rook.canMoveTo(squareSix));
    assert(this.rook.canMoveTo(squareSeven));
  });

  it('should move north, south, east, west given empty spaces', function () {
    let squareTwo = this.board.findSquare (0, 6);
    let squareThree = this.board.findSquare (1, 7);
    let squareFour = this.board.findSquare (1, 2);
    let squareFive = this.board.findSquare (5, 6);


    assert(this.rook.canMoveTo(squareTwo));
    assert(this.rook.canMoveTo(squareThree));
    assert(this.rook.canMoveTo(squareFour));
    assert(this.rook.canMoveTo(squareFive));
  });

  it('should not move diagonally', function () {
    let squareTwo = this.board.findSquare (0, 5);
    let squareThree = this.board.findSquare (0, 7);
    let squareFour = this.board.findSquare (2, 5);
    let squareFive = this.board.findSquare (2, 7);


    assert.equal(this.rook.canMoveTo(squareTwo), false);
    assert.equal(this.rook.canMoveTo(squareThree), false);
    assert.equal(this.rook.canMoveTo(squareFour), false);
    assert.equal(this.rook.canMoveTo(squareFive), false);
  });

  it('should know it cant move to a given ally occupied space', function () {
    let squareTwo = this.board.findSquare (2, 6);
    let piece = new Piece(squareTwo, 'black');
    squareTwo.piece = piece;

    assert.equal(this.rook.canMoveTo(squareTwo), false);
  });

  it('should know it cant move through a piece', function () {
    let squareTwo = this.board.findSquare (2, 6);
    let piece = new Piece(squareTwo, 'black');
    squareTwo.piece = piece;
    let squareThree = this.board.findSquare (3, 6);
    let squareFour = this.board.findSquare (1, 5);
    let pieceTwo = new Piece(squareFour, 'black');
    squareFour.piece = pieceTwo;
    let squareFive = this.board.findSquare (1, 4);

    assert.equal(this.rook.canMoveTo(squareThree), false);
    assert.equal(this.rook.canMoveTo(squareFive), false);
  });
});
