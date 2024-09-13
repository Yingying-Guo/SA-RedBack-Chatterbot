import { exec } from 'child_process';


console.log('Starting frontend...');
const frontend = exec('npm run start:frontend');

frontend.stdout.on('data', (data) => {
  console.log(`Frontend: ${data}`);
});

frontend.stderr.on('data', (data) => {
  console.error(`Frontend Error: ${data}`);
});

frontend.on('close', (code) => {
  console.log(`Frontend process exited with code ${code}`);
});

console.log('Starting backend...');
const backend = exec('npm run start:backend');

backend.stdout.on('data', (data) => {
  console.log(`Backend: ${data}`);
});

backend.stderr.on('data', (data) => {
  console.error(`Backend Error: ${data}`);
});

backend.on('close', (code) => {
  console.log(`Backend process exited with code ${code}`);
});
