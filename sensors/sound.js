const { Gpio } = require('onoff');
const pir = new Gpio(17, 'in', 'both');

console.log('....Starting sound sensor')

pir.watch((err, value) => {
    if (err) {
        return exit(err);
    }

    if (value) {
        process.send({
            type: 'sound',
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
