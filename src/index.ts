import inquirer from 'inquirer';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Função para executar o k6 com um script específico
async function runK6Test(scriptPath: string, url: string): Promise<void> {
  console.log(`Iniciando teste com o script: ${scriptPath}`);
  try {
    const { stdout, stderr } = await execAsync(`k6 run ${scriptPath} -e URL=${url}`);
    if (stdout) console.log(`Resultado do teste (${scriptPath}):\n${stdout}`);
    if (stderr) console.error(`Erros no teste (${scriptPath}):\n${stderr}`);
  } catch (error) {
    console.error(`Erro ao executar o teste (${scriptPath}):`, error);
  }
}

// Função principal
async function main() {
  console.log("Bem-vindo ao Testador de Performance com k6!");

  // Solicita a URL ao usuário
  const { url } = await inquirer.prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Informe a URL que deseja testar:',
      validate: (input) => (input ? true : 'A URL não pode estar vazia.'),
    },
  ]);

  // Lista de tipos de teste disponíveis
  const { selectedTests } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedTests',
      message: 'Selecione os tipos de teste que deseja executar:',
      choices: ['Load Test', 'Spike Test', 'Stress Test', 'Soak Test'],
      validate: (input) =>
        input.length > 0 ? true : 'Você deve selecionar pelo menos um teste.',
    },
  ]);

  console.log('\nIniciando os testes...\n');

  // Mapear os testes para os caminhos correspondentes
  const scriptPaths: Record<string, string> = {
    'Simple Test': './scripts/simple_test.js',
    'Load Test': './scripts/load_test.js',
    'Spike Test': './scripts/spike_test.js',
    'Stress Test': './scripts/stress_test.js',
    'Soak Test': './scripts/soak_test.js',
  };

  // Executar os testes selecionados
  await Promise.all(
    selectedTests.map((testType: string) => runK6Test(scriptPaths[testType], url))
  );

  console.log("\nTodos os testes foram finalizados.");
}

// Executa o programa
main().catch((error) => console.error('Erro ao executar:', error));
