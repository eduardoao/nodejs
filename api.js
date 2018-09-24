const https = require('https');

module.exports = app => {

    var ip1 = require('ip');
    const ip = ip1.address();
   //const ip = app.get('ip');
    let counter = 0;

    const carros = [
        { "nome": "Azera V6", "preco": 85000.0, "fotos": [`https://boiling-peak-16173.herokuapp.com/images/azera-v6-1.jpg`, `https://boiling-peak-16173.herokuapp.comcimages/azera-v6-2.jpg`, `https://boiling-peak-16173.herokuapp.com/images/azera-v6-3.jpg`] },
        { "nome": "Onix 1.6", "preco": 35000.0, "fotos": [`https://boiling-peak-16173.herokuapp.com/images/onix-16-1.jpg`, `https://boiling-peak-16173.herokuapp.com/images/onix-16-2.jpg`, `https://boiling-peak-16173.herokuapp.com/images/onix-16-3.jpg`] },
        { "nome": "Fiesta 2.0", "preco": 52000.0, "fotos": [`https://boiling-peak-16173.herokuapp.com/images/fiesta-20-1.jpg`, `https://boiling-peak-16173.herokuapp.com/images/fiesta-20-2.jpg`, `https://boiling-peak-16173.herokuapp.com/images/fiesta-20-3.jpg`] },
        { "nome": "C3 1.0", "preco": 22000.0, "fotos": [`https://boiling-peak-16173.herokuapp.com/images/c3-10-1.jpg`, `https://boiling-peak-16173.herokuapp.com/images/c3-10-2.jpg`, `https://boiling-peak-16173.herokuapp.com/images/c3-10-3.jpg`] },
        { "nome": "Uno Fire", "preco": 11000.0, "fotos": [`https://boiling-peak-16173.herokuapp.com/images/uno-fire-1.jpg`, `https://boiling-peak-16173.herokuapp.com/images/uno-fire-2.jpg`] },
        { "nome": "Sentra 2.0", "preco": 53000.0, "fotos": [`https://boiling-peak-16173.herokuapp.com/images/sentra-20-1.jpg`, `https://boiling-peak-16173.herokuapp.com/images/sentra-20-2.jpg`, `https://boiling-peak-16173.herokuapp.com/images/sentra-20-3.jpg`] },
        { "nome": "Astra Sedan", "preco": 39000.0, "fotos": [`https://boiling-peak-16173.herokuapp.com/images/astra-sedan-1.jpg`, `https://boiling-peak-16173.herokuapp.com/images/astra-sedan-2.jpg`] },
        { "nome": "Audi A3 Sedan", "preco": 115000.0, "fotos": [`https://boiling-peak-16173.herokuapp.com/images/audi-a3-sedan-1.jpg`, `https://boiling-peak-16173.herokuapp.com/images/audi-a3-sedan-2.jpg`, `https://boiling-peak-16173.herokuapp.com/images/audi-a3-sedan-3.jpg`] },
        { "nome": "Hilux 4x4", "preco": 90000.0, "fotos": [`https://boiling-peak-16173.herokuapp.com/images/hilux-4x4-1.jpg`, `https://boiling-peak-16173.herokuapp.com/images/hilux-4x4-2.jpg`, `http://${ip}/images/hilux-4x4-3.jpg`] },
        { "nome": "Montana", "preco": 57000.0, "fotos": [`https://boiling-peak-16173.herokuapp.com/images/montana-1.jpg`, `https://boiling-peak-16173.herokuapp.com/images/montana-2.jpg`, `https://boiling-peak-16173.herokuapp.com/images/montana-3.jpg`] },
        { "nome": "Outlander 2.4", "preco": 99000.0, "fotos": [`https://boiling-peak-16173.herokuapp.com/images/outlander-24-1.jpg`, `https://boiling-peak-16173.herokuapp.com/images/outlander-24-2.jpg`, `https://boiling-peak-16173.herokuapp.com/images/outlander-24-3.jpg`] },
        { "nome": "Brasilia Amarela", "preco": 9500.0, "fotos": [`https://boiling-peak-16173.herokuapp.com/images/brasilia-amarela-1.jpg`, `https://boiling-peak-16173.herokuapp.com/images/brasilia-amarela-2.jpg`, `http://${ip}/images/brasilia-amarela-3.jpg`] },
        { "nome": "Porsche 911 Carrera", "preco": 100000.0, "fotos": [`https://boiling-peak-16173.herokuapp.com/images/porsche-911-carrera-1.jpg`, `https://boiling-peak-16173.herokuapp.com/images/porsche-911-carrera-2.jpg`] },
        { "nome": "Hyundai HB20", "preco": 60000.0, "fotos": [`https://boiling-peak-16173.herokuapp.com/images/hyundai-hb20-1.jpg`, `https://boiling-peak-16173.herokuapp.com/images/hyundai-hb20-2.jpg`] },
        { "nome": "Camaro SS", "preco": 120000.0, "fotos": [`https://boiling-peak-16173.herokuapp.com/images/camaro-ss-1.jpg`, `https://boiling-peak-16173.herokuapp.com/images/camaro-ss-2.jpg`, `https://boiling-peak-16173.herokuapp.com/images/camaro-ss-3.jpg`] },
        { "nome": "BMW Cabrio", "preco": 110000.0, "fotos": [`https://boiling-peak-16173.herokuapp.com/images/bmw-cabrio-1.jpg`, `https://boiling-peak-16173.herokuapp.com/images/bmw-cabrio-2.jpg`] }
    ];

    const usuario = {
        "id": 1,
        "nome": "Teste",
        "dataNascimento": "30/01/1993",
        "telefone": "(21) 9988-7788",
        "email": "eoalcantara@gmail.com",
        "senha": "123"
    };

    app.get('/api/carro/listaTodos', (req, res) =>
        res.json(carros));

    app.post('/api/agendamento/agenda', (req, res) => {
        counter++;

        const agendamento = req.body;
        
        if (counter % 3 != 0) {
            console.log('Agendamento recebido: ' + JSON.stringify(agendamento));
            setTimeout(() => enviaNotificacao(agendamento), 5000);
            res.json(null);
        } else {
            console.log('Erro no processamento do agendamento.');
            res.status(500).end();
        }
    });

    app.post('/api/login', (req, res) => {
        let usuarioLogin = req.body;

        if (usuarioLogin.email == usuario.email 
            && usuarioLogin.senha == usuario.senha) {

                res.json(usuario);
        } else {
            res.status(403).end();
        }
    });

    function enviaNotificacao(agendamento) {
        const agendamentoId = agendamento.emailCliente + agendamento.data.substr(0, 10);

        const message = { 
            app_id: "e53f5d24-40e4-458f-99db-5230cf3f8bc0",
            headings: {"en": "Aluracar"},
            contents: {"en": "Agendamento confirmado!"},
            data: {"agendamento-id": agendamentoId},
            included_segments: ["All"]
        };

        const headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Basic MGJlOGMxZGEtMDY3Ni00NWY3LWI0ZjYtMjRjMjYzMzhmZmEz"
        };
        
        const options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };
        
        const req = https.request(options, function(res) {  
          res.on('data', function(data) {
           // console.log("Response:");
           // console.log(JSON.parse(data));
          });
        });
        
        req.on('error', function(e) {
          console.log("ERROR:");
          console.log(e);
        });
        
        req.write(JSON.stringify(message));
        req.end();
      }
};
