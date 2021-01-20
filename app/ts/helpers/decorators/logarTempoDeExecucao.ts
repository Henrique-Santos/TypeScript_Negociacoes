export function logarTempoDeExecucao(emSegundos: boolean = false) {

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;

        // aqui vamos substituir descriptor.value pela lógica do nosso decorator

        descriptor.value = function(...args: any[]) {

            let divisor = 1;
            let unidade = 'milisegundos';
            if(emSegundos) {
                divisor = 1000;
                unidade = 'segundos';
            }

            console.log('------------------------------');
            console.log(`Parâmetros do método ${propertyKey}: ${JSON.stringify(args)}`);
            const t1 = performance.now();

            // Lógica feita antes de executar o método
            const resultado = metodoOriginal.apply(this, args);
            // Lógica feita após a sua execução

            console.log(`Resultado do método: ${JSON.stringify(resultado)}`);
            const t2 = performance.now();
            console.log(`${propertyKey} demorou ${(t2 - t1)/divisor} ${unidade}`);
            console.log('------------------------------');

            return resultado;
        }

        return descriptor;
    }
}

/* Explicando o essa função Decorator

Essa função indica o nome do nosso decorator, mas sua implementação deve estar na função 
retornada por logarTempoDeExecucao.

A função retornada não recebe três parâmetros por acaso. O primeiro target é aquele que possui
uma referência para o elemento cujo método foi decorado por logarTempoDeExecucao. O segundo
parâmetro é uma string que nos retorna o nome do método decorado. Por fim, o descriptor nos 
dará acesso ao método que desejamos modificar sua execução, através de descriptor.value.

A ideia é a seguinte. Vamos guardar uma referência para o método original antes de substituí-lo
com nosso código. É importante que no final o descriptor seja retornado, com as modificações 
que faremos.

O valor de descriptor.value será function(...args: any[]). Isso se dá dessa forma, porque o
método que estamos sobrescrevendo pode receber zero, um ou mais parâmetros de tipos que 
desconhecemos. Usamos ... para indicar um REST PARAMETER.

Fazemos metodoOriginal.apply(this, args) para invocar o método original, no contexto de this,
que é o objeto no qual esse método está sendo chamado, passando os parametros e capturando
seu resultado, caso exista e retorná-lo.

A nosso lógica calcula quanto tempo o método demora para executar, e mostra isso em segundos ou
milisegundos.

*/