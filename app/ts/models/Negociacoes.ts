import { MeuObjeto } from './MeuObjeto';
import { Negociacao } from './Negociacao';

export class Negociacoes implements MeuObjeto<Negociacoes>{

    private _negociacoes: Array<Negociacao> = [];

    adiciona(negociacao: Negociacao): void {

        this._negociacoes.push(negociacao);
    }

    paraArray(): Array<Negociacao> { // Especificando o retorno do método

        // Passando uma cópia do objeto real, blindando assim a sua modificação
        // Definifo que o array vazio criado será do tipo Negociacao
        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    paraTexto(): void {

        console.log('Impressão');
        console.log(JSON.stringify(this._negociacoes));
    }

    ehIgual(negociacoes: Negociacoes): boolean {

        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.paraArray());
    }
    
}

