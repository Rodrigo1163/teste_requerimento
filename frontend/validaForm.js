import { cpf } from 'cpf-cnpj-validator';
import submitForm from './gerarPDFIndex';

export default async function validaForm() {
    var form = document.querySelector('.needs-validation');
    
    form.addEventListener('submit',  async function (event) {
        event.preventDefault();

        var valid = true;
        const inputCpfInput = form.querySelector('.cpf').value;
        const inputCpf = form.querySelector('.cpf');
        const validaCPF = form.querySelector('.validaCPF'); 

        if (!form.checkValidity()) {
            
            valid = false
        }
        if (!cpf.isValid(inputCpfInput)) {
            
            validaCPF.innerText = 'CPF Inválido';
            validaCPF.classList.add('invalid-feedback');

            inputCpf.classList.add('is-invalid');
            inputCpf.classList.remove('is-valid');
            valid = false;

        } else {
            validaCPF.classList.remove('invalid-feedback');
            validaCPF.classList.add('valid-feedback');
            validaCPF.innerText = 'CPF Válido';

            inputCpf.classList.add('is-valid');
            inputCpf.classList.remove('is-invalid');
        }
        if(valid){
            submitForm(form);
        } 

        form.classList.add('was-validated');
    });
    
};


