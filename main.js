function Token(type, value) {
    this.type = type
    this.value = value
    this.toString = () => `Token(${type}, ${value})`
}

const isWhitespace = (char) => /\s/u.test(char)
const isDigit = (char) => /\d/u.test(char)

function Lexer(text) {
    let pos = 0
    let currentChar = text.charAt(pos)

    const advance = () => {
        currentChar = text.charAt(++pos) || null
    }

    const skipWhitespace = () => {
        while (isWhitespace(currentChar)) {
            advance()
        }
    }

    const integer = () => {
        let result = ''
        while (isDigit(currentChar)) {
            result += currentChar
            advance()
        }
        return Number.parseInt(result)
    }

    this.getNextToken = () => {
        while (currentChar) {
            if (isWhitespace(currentChar)) {
                skipWhitespace()
            } else if (isDigit(currentChar)) {
                return new Token('int', integer())
            } else if ('+-*/()'.includes(currentChar)) {
                const char = currentChar
                advance()
                return new Token(char, char)
            } else {
                throw new Error()
            }
        }

        return new Token('EOF', null)
    }
}

function Interpreter(lexer) {
    let currentToken = lexer.getNextToken()

    const eat = (tokenType) => {
        if (currentToken.type === tokenType) {
            currentToken = lexer.getNextToken()
        } else {
            throw new Error()
        }
    }

    const factor = () => {
        const token = currentToken
        if (token.type == 'int') {
            eat('int')
            return token.value
        } else {
            eat('(')
            const result = this.expr()
            eat(')')
            return result
        }
    }

    const term = () => {
        let result = factor()
        while ('*/'.includes(currentToken.type)) {
            const currentTokenType = currentToken.type
            eat(currentTokenType)
            result = (currentTokenType === '*') ? result * factor() : result / factor()
        }
        return result
    }

    this.expr = () => {
        let result = term()
        while ('+-'.includes(currentToken.type)) {
            const token = currentToken
            eat(token.type)
            result = (token.type === '+') ? result + term() : result - term()
        }
        return result
    }
}

const interpreter = new Interpreter(new Lexer('7 + 3 * (10 / (12 / (3 + 1) - 1)) / (2 + 3) - 5 - 3 + (8)'))
// const interpreter = new Interpreter(new Lexer('7 + 3 * (10 / (12 / (3 + 1) - 1))'))
// const interpreter = new Interpreter(new Lexer('(3+2)*2/2'))
const result = interpreter.expr()
console.log(result)
