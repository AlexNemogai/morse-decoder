const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    // write your solution here
    var exprString = expr;                                   //copy string from test
    var masExprWithNumbers = [];                             //massive with number
    var masWithDecodeString = [];                            // mas with decodeString == key for morse_table
    var space = ' ', numberFromStringAtMass = 0, decodeString = '';
    for(var i = 0; i<exprString.length; i+=10){    
    //create mas for 10 char string(change it to int(binary))          
    //push to mas number(parseInt(from string 10 char)) and push our decode mas with void string ('')
        if(exprString.substring(i, i+10)!='**********'){
            masExprWithNumbers.push(numberFromStringAtMass = parseInt(exprString.substring(i, i+10),2));
            masWithDecodeString.push('');
        }else if(exprString.substring(i, i+10)==='**********'){
            masExprWithNumbers.push(-1);
            masWithDecodeString.push('');
        }
    }
    for(var j = 0; j<masExprWithNumbers.length;j++){

        // |if( 512(+)256(-) ) if( 512(+)256(+) )|...|...|...|...|...|...|...|...|
        // |     10           or       11             |...|...|...|...|...|...|...|...|
        // |        ...       |        ...            |...|...|...|...|...|...|...|...|
        if(masExprWithNumbers[j]>=(2**9) && masExprWithNumbers[j]<=( (2**9)+(2**7)+(2**6)+(2**5)+(2**4)+(2**3)+(2**2)+3 )){
            masWithDecodeString[j]+='.';
            masExprWithNumbers[j]-=(2**9);
        }
        if(masExprWithNumbers[j]>= (2**9)+(2**8)){
            masWithDecodeString[j]+='-';
            masExprWithNumbers[j]-=( (2**9)+(2**8) );
        }

        // |...|...|if( 128(+)64(-) ) if( 128(+)64(+) )|...|...|...|...|...|...|
        // |...|...|     10         or       11             |...|...|...|...|...|...|
        // |...|...|     ...         |       ...            |...|...|...|...|...|...|
        if(masExprWithNumbers[j]>=(2**7) && masExprWithNumbers[j]<= ( (2**7)+(2**5)+(2**4)+(2**3)+(2**2)+3 )){
            masWithDecodeString[j]+='.';
            masExprWithNumbers[j]-=(2**7);
        }
        if(masExprWithNumbers[j]>= (2**7)+(2**6)){
            masWithDecodeString[j]+='-';
            masExprWithNumbers[j]-=( (2**7)+(2**6) );
        }

        // |...|...|...|...|if( 32(+)16(-) ) if( 32(+)16(+) )|...|...|...|...|
        // |...|...|...|...|      10        or       11           |...|...|...|...|
        // |...|...|...|...|      ...        |       ...          |...|...|...|...|
        if(masExprWithNumbers[j]>=(2**5) && masExprWithNumbers[j]<= ( (2**5)+(2**3)+(2**2)+3 )){
            masWithDecodeString[j]+='.';
            masExprWithNumbers[j]-=(2**5);
        }
        if(masExprWithNumbers[j]>= (2**5)+(2**4)){
            masWithDecodeString[j]+='-';
            masExprWithNumbers[j]-=( (2**5)+(2**4) );
        }

        // |...|...|...|...|...|...|if( 8(+)4(-) ) if( 8(+)4(+) )|...|...|
        // |...|...|...|...|...|...|      10      or      11          |...|...|
        // |...|...|...|...|...|...|      ...     |       ...         |...|...|
        if(masExprWithNumbers[j]>=(2**3) && masExprWithNumbers[j]<= ( (2**3)+3 )){
            masWithDecodeString[j]+='.';
            masExprWithNumbers[j]-=(2**3);
        }
        if(masExprWithNumbers[j]>= (2**3)+(2**2)){
            masWithDecodeString[j]+='-';
            masExprWithNumbers[j]-=( (2**3)+4 );
        }

        //end of binary jungle
        if(masExprWithNumbers[j]==2){
            masWithDecodeString[j]+='.';
            masExprWithNumbers[j]-=2;
        }
        if(masExprWithNumbers[j]==3 ){
            masWithDecodeString[j]+='-';
            masExprWithNumbers[j]-=3;
        }

        //what about '**********' string? it's a -1
        if(masExprWithNumbers[j]==-1){
            masWithDecodeString[j]+=space;
        }
    }

    //final for, whrite the decodeString
    for(var k = 0; k<masExprWithNumbers.length; k++){
        if(masWithDecodeString[k]!=space){
            decodeString+= MORSE_TABLE[masWithDecodeString[k]];
        }else{
            decodeString+= space;
        }
    }

    return decodeString;
}

module.exports = {
    decode
}