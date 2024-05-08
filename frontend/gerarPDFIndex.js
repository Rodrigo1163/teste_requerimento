export default function submitForm () {
    const formData = new FormData(form);
    const formDataJson = {}; 
    formData.forEach((value, key) => {
        formDataJson[key] = value;

    });


    fetch('/print', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataJson)
    })
        .then(response => response.blob())
        .then(blob => {
            const url =  window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'formulario.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error:', error)
        });
}