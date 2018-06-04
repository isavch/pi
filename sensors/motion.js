const { Gpio } = require('onoff');
const pir = new Gpio(4, 'in', 'both');

console.log('....Starting motion sensor')

pir.watch((err, value) => {
    if (err) {
        return exit(err);
    }

    if (value) {
        process.send({ 
            type: 'motion', 
            payload: { 
                value, 
                date: Date.now() 
            } 
        });
    }
});

console.log('....Watching')
   
function exit(err) {
    consoe.log('....Exiting', err.message)
    pir.unexport();
    process.exit();
}
