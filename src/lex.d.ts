declare module 'lex' {

  export interface Token {
    start: number;
    end: number;
    value: string;
    name: string;
  }
  export default class Lexer {
    index: number;
    length: number;
    constructor(fn: ()=>void);
    addRule(regex: RegExp, fn: (value:string)=>void): this;
    lexAll(): Token[];
    lex(): Token;
    setInput(input: string): this;
  }
}
