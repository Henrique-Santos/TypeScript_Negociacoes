import { Negociacao, Negociacoes, NegociacaoParcial } from '../models/index';
import { NegociacoesView, MensagemView } from '../views/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService } from '../services/index';
import { imprime } from '../helpers/index';

export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery; 
    @domInject('#quantidade')
    private _inputQuantidade: JQuery;
    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes(); // Ao passar o objeto, já é declarado implicitamente o seu tipo
    private _negociacoesView = new NegociacoesView('#negociacoesView');  // Passando um seletor CSS que indica o elemento que receberá a compilação do template
    private _mensagemView = new MensagemView('#mensagemView');
    private _service = new NegociacaoService();

    constructor() {

        this._negociacoesView.update(this._negociacoes);
    }

    @throttle()
    adiciona(event: Event) {

        let data = new Date(this._inputData.val().replace(/-/g, ',')); // Passando uma expressão regular que troca o '-' por ',', que é o aceitavel no construtor do Date

        if (!this._ehDiaUtil(data)) {

            this._mensagemView.update('Somente negociações em dias úteis, por favor!');
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso!');

        imprime(negociacao, this._negociacoes);
    }

    _ehDiaUtil(data: Date) {

        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }

    @throttle()
    async importarDados() {

        try {

            const negociacoesParaImportar = await this._service
                .obterNegociacoes(res => {
                    if (res.ok) {
                        return res;
                    } else {
                        throw new Error(res.statusText);
                    }
                });
            
            const negociacoesJaImportadas = this._negociacoes.paraArray();
            
            negociacoesParaImportar
                .filter(negociacao =>
                    !negociacoesJaImportadas.some(jaImportada =>
                        negociacao.ehIgual(jaImportada)))
                .forEach(negociacao => this._negociacoes.adiciona(negociacao));

            this._negociacoesView.update(this._negociacoes);

        } catch(err) {
            this._mensagemView.update(err);
        }
        
    }

}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}
