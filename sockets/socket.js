const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
const bands = new Bands();
bands.addBand(new Band('ACDC'));
bands.addBand(new Band('Linkin Park'));
bands.addBand(new Band('Metalica'));
bands.addBand(new Band('Queen'));


//mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    client.emit('active-bands', bands.getBands());
    
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
     });
    
    client.on('mensaje', ( payload)=>{
        console.log('mensaje',payload);
        io.emit('mensaje', {admin: 'Nuevo Mensaje'});

    });
    client.on('vote-band', (payload)=>{
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());

    });
    client.on('add-band', (payload)=>{
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
        

    });
    client.on('delete-band', (payload)=>{
        
        bands.deleteBand(payload.id)
        io.emit('delete-band', bands.getBands());
        

    });

    //client.on('Emitir-mensaje',(payload)=>{
        //console.log(payload);
       // io.emit('Nuevo-mensaje', payload); //emite a todos
       //client.broadcast.emit('Nuevo-mensaje', payload); //emite a todos menos a el que lo emitio

    //});
  });