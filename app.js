const prompt = require('prompt-sync')();
const watson = require('watson-developer-cloud/assistant/v1'); // watson sdk
 
const Username = 'apikey';
const Password = 'J9bc_hP8hF2bRELmOKn2lWI3q7_A__C9lQuhOBc2GIey';
 
const chatbot = new watson({
    'version': '2018-02-16',
    'username': Username,
    'password': Password,
  });
 
  const workspace_id = '10987eb4-9d22-4d57-94fc-71789b3095f3';
 
  chatbot.message({workspace_id},trataResposta);

  let fimDeConversa = false;

  //Começando a conversação com a mensagem vazia;
  function trataResposta(err, resposta){
 
    if(err){
        console.log(err);
        return;
    }

    //detecta a intenção do usuário
    if (resposta.intents.length > 0){
      console.log('Eu detectei a intenção: ' + resposta.intents[0].intent);
      if(resposta.intents[0].intent == 'despedida'){
        fimDeConversa = true;
      }
    }

    //console.log(resposta);
    // exibe a resposta do dialogo,caso exista
    if(resposta.output.text.length > 0){
        console.log(resposta.output.text[0]);
    }

    if(!fimDeConversa){
      const mensagemUsuario = prompt ('>>');
      chatbot.message({
        workspace_id,
        input: {text: mensagemUsuario},
        context: resposta.context,
      }, trataResposta);
    }


    
  };
