export function domInject(seletor: string) {

    return function(target: any, key: string) {

        let elemento: JQuery;

        const getter = function() {

            if (!elemento) {
                console.log(`Buscando ${seletor} para injetar em ${key}`);
                elemento = $(seletor); // Utilizando o seletor do jQuery
            }

            return elemento;
        }

        Object.defineProperty(target, key, {
            get: getter
        });

    }

}

/* Explicando o Decorator em uma propriedade

Assim com o decorator de um método é necessario retornar uma função, o primeiro parametro nessa
função de retorno, é o objeto que possui essa propriedade, e key o nome dessa propriedade.

Estamos substituindo a propriedade por uma função getter, que o JS o considera como uma propriedade

Estamos usando a estratégia de lazy loading. Só buscaremos o elemento do DOM quando o getter for
acessado pela primeira vez.

Agora criaremos a função getter para as propriedades, com o Object.defineProperty(). Passando
o objeto alvo (target), o nome da propriedade e um objeto que passa a sua definição.

*/