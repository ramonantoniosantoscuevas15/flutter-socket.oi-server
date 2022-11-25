const {io} = require('../index');
//mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
     });
    
    client.on('mensaje', ( payload)=>{
        console.log('mensaje',payload);
        io.emit('mensaje', {admin: 'Nuevo Mensaje'});

    });
    client.on('Emitir-mensaje',(payload)=>{
       // io.emit('Nuevo-mensaje', payload); //emite a todos
       client.broadcast.emit('Nuevo-mensaje', payload); //emite a todos menos a el que lo emitio

    });
  });