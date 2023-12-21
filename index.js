
// modo escuro e claro
// Defina as funções no escopo global
function enableDarkMode() {

  const body = document.body;
  const toggleButton = document.getElementById('toggle-mode');

  body.classList.add('dark-mode');
  localStorage.setItem('mode', 'dark');
  toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
  
}

function enableLightMode() {
  const body = document.body;
  const toggleButton = document.getElementById('toggle-mode');

  body.classList.remove('dark-mode');
  localStorage.setItem('mode', 'light');
  toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
}

function toggleDarkMode() {
  const currentMode = localStorage.getItem('mode');
  if (currentMode === 'dark') {
    enableLightMode();
  } else {
    enableDarkMode();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggle-mode');

  // Adicionar um ouvinte de evento para alternar entre os modos
  toggleButton.addEventListener('click', toggleDarkMode);

  // Verificar o modo atual e ajustar o texto do botão
  const currentMode = localStorage.getItem('mode');
  if (currentMode === 'dark') {
    enableDarkMode();
  } else {
    enableLightMode();
  }
});


function TrocaIcon() {
  var iconElement = document.getElementById("capture");
  iconElement.innerHTML = '<i class="fas fa-microphone-slash"></i>';
  iconElement.style.backgroundColor = 'green';
}

function VoltarIcon() {
  var iconElement = document.getElementById("capture");
  iconElement.innerHTML = '<i class="fas fa-microphone"></i>';
  iconElement.style.backgroundColor = '#dd203c';
}


// Capturar voz do navegador e transcrever

// function CapturarVoz() {

//   var startButton = document.getElementById('capture');
//   var resultElement = document.getElementById('prompt');

//   var recognition = new webkitSpeechRecognition();

//   recognition.lang = window.navigator.language;
//   recognition.interimResults = false;
//   recognition.continuous = true;

//   recognition.start();


//   recognition.addEventListener('result', (event) => {

//     const result = event.results[event.results.length - 1][0].transcript;


//     if (result.toLowerCase().includes('trocar tema')) {

//       toggleDarkMode();

//       ReproduzirVoz('Tema alterado!');

//       return;

//     }

//     TrocaIcon();

//     let array_pergunta = result.toLowerCase();

//     // Escrevemos no input a pergunta
//     resultElement.value = array_pergunta;

//     // Pare a captura de voz
//     recognition.stop();

//     // Consulte a API do OpenAI
//     // ConsultarOpenAI(array_pergunta); Desativado por falta de API paga!
//     ReproduzirVoz(array_pergunta); //ativado por testes apernas!



//     // Depois de 5 segundos, reinicie a captura de voz
//     setTimeout(() => {

//       recognition.start();

//       VoltarIcon();

//     }, 5000);
//   });
// }


// Reproduz texto pelo azure TTS

const ReproduzirVoz = (resposta) => {

  var myHeaders = new Headers();
  myHeaders.append("Ocp-Apim-Subscription-Key", "6fe2568ade1f439594779582282f4396");
  myHeaders.append("Content-Type", "application/ssml+xml");
  myHeaders.append("X-Microsoft-OutputFormat", "audio-16khz-128kbitrate-mono-mp3");
  myHeaders.append("User-Agent", "curl");

  var raw = "<speak version='1.0' xml:lang='pt-BR'>\r\n    <voice xml:lang='pt-BR' xml:gender='Female' name='pt-BR-FranciscaNeural'>\r\n  " + resposta + "\r\n    </voice>\r\n</speak>";

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://brazilsouth.tts.speech.microsoft.com/cognitiveservices/v1", requestOptions)
    .then(response => {
      if (response.ok) {
        return response.arrayBuffer();
      } else {
        throw new Error(`Falha na requisição: ${response.status} - ${response.statusText}`);
      }
    })
    .then(data => {
      const blob = new Blob([data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(blob);

      const audioElement = new Audio(audioUrl);
      audioElement.play();
    })
    .catch(error => {
      console.error('Erro:', error);
    });

}



// CapturarVoz();



function obterValor() {
  // Obtém o elemento de entrada pelo ID
  var inputElement = document.getElementById('prompt');

  // Obtém o valor do elemento de entrada
  var valorInput = inputElement.value;

  // Exibe o valor no console (você pode armazená-lo em uma variável aqui)
  console.log('Valor do Input:', valorInput);

  ReproduzirVoz(valorInput);

  // Se você quiser armazenar o valor em uma variável global
  // var minhaVariavel = valorInput;
}
