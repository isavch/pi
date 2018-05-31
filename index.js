const { Gpio } = require('onoff');
const pir = new Gpio(17, 'in', 'both');

pir.watch((err, value) => {
    if (err) {
        return exit(err);
    }
    
    console.log('Motion detected', value);
});
   
function exit(err) {
    consoe.log('....Exiting', err.message)
    pir.unexport();
    process.exit();
}