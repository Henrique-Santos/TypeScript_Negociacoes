import { Negociacao, NegociacaoParcial } from '../models/index';

export class NegociacaoService {

    obterNegociacoes(handler: HandlerFunction): Promise<Negociacao[]> {

        return fetch('http://localhost:8080/dados')
            .then(res => handler(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) => 
                dados.map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
            )
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possivel obter as importações.');
            });
    }
}

export interface HandlerFunction {

    (res: Response): Response 
}
/*
Estou especificando a assinatura, que a função recebida pelo método que utiliza essa interface 
como tipo, deve ter, ela dever receber uma Response e retornar uma Response 
*/ 

